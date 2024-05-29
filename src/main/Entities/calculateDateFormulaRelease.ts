import { Temporal } from '@js-temporal/polyfill'

type PeriodExpression = {
    isPeriod: boolean,
    periodic?: number,
    startOffset: number,
    endOffset: number,
    key: string,
}

type Boundaries = {
    start: Temporal.ZonedDateTime,
    end: Temporal.ZonedDateTime,
}

type ClosestPeriods = [Boundaries | null, Boundaries]
type ClosestPeriodsOptional = [Boundaries | null, Boundaries | null]

/**
 * Calculate the time of next date formula realise.
 */
export function calculateDateFormulaRelease(formula: string) {
    let periodExpressions: PeriodExpression[] = formula
    .split(' ')
    .map((expression) => {
        const [symbolValue, symbol] = parseExpression(expression)
        const symbolInfo = getSymbolInfo(symbol)
        const periodOffset = getPeriodOffset(symbolValue, symbolInfo.isPeriod)

        return {
            ...symbolInfo,
            ...periodOffset,
        }
    })

    periodExpressions = combinePeriods(periodExpressions)

    const timeZone = Temporal.Now.timeZoneId()
    const [_, nextPeriod] = getClosestPeriods(periodExpressions, timeZone)

    return nextPeriod.start.epochMilliseconds
}

function getYearStartEnd(year: number, timeZone: string) {
    const yearStart = Temporal.ZonedDateTime.from({
        year,
        month: 1,
        day: 1,
        timeZone,
    })

    const yearEnd = Temporal.ZonedDateTime.from({
        year: year + 1,
        month: 1,
        day: 1,
        timeZone,
    }).add({ nanoseconds: -1 })

    return { yearStart, yearEnd }
}

class PeriodBoundaries {
    private _start: Temporal.ZonedDateTime
    private _end: Temporal.ZonedDateTime
    private _confirmedStart: Temporal.ZonedDateTime
    private _confirmedEnd: Temporal.ZonedDateTime


    constructor(year: number, timeZone: string) {
        const startEnd = getYearStartEnd(year, timeZone)
        this._start = startEnd.yearStart
        this._end = startEnd.yearEnd
        this._confirmedStart = startEnd.yearStart
        this._confirmedEnd = startEnd.yearEnd
    }

    /**
     *  If the value is negative - calculate the start relative to the _end
     */
    public narrowStart(unit: string, value: number) {
        if (value === 0) return

        if (value < 0) {
            this._start = this._end.add({ [`${unit}s`]: value })
            return
        }

        this._start = this._start.add({ [`${unit}s`]: value })
    }

    /**
     *  If the value is positive - calculate the end relative to the _start
     */
    public narrowEnd(unit: string, value: number) {
        if (value === 0) return

        if (value > 0) {
            this._end = this._start.add({ [`${unit}s`]: value })
            return
        }

        this._end = this._end.add({ [`${unit}s`]: value })
    }

    /**
     * narrowStart and narrowEnd do not change values immediately,
     * need call this method to apply new values.
     * (for prevent situation when relative values are calculated from the changed values)
     */
    applyNewValues() {
        this._confirmedStart = Temporal.ZonedDateTime.from(this._start)
        this._confirmedEnd = Temporal.ZonedDateTime.from(this._end)
    }

    get start() {
        return this._confirmedStart
    }

    get end() {
        return this._confirmedEnd
    }

    /**
     * Check if the _end bound is less than the _start bound
     */
    get isCollapsed() {
        return this._end.epochNanoseconds < this._start.epochNanoseconds
    }

    fromBoundaries(other: Boundaries) {
        this._start = Temporal.ZonedDateTime.from(other.start)
        this._end = Temporal.ZonedDateTime.from(other.end)
    }
}

/**
 * Example for "30 minutes":
 *  - it will create a sub periods every 30 minutes like:
 *  - 00:00 - 00:30, 00:30 - 01:00, 01:00 - 01:30, ...
 *  - on the entered period boundaries
 */
class PeriodsIterator {
    constructor(
        private start: Temporal.ZonedDateTime,
        private end: Temporal.ZonedDateTime,
        private unit: string,
        private periodic: number,
    ) {
    }

    /**
     * Calc current and next periods boundaries,
     *  based on the entered time.
     */
    getScoped(now: Temporal.ZonedDateTime) {
        const current: Partial<Boundaries> = {
            start: undefined,
            end: undefined,
        }

        const next: Partial<Boundaries> = {
            start: undefined,
            end: undefined,
        }

        for (const periodStart of this) {
            if (!periodStart) throw new Error('Period start is undefined')
            const periodEnd = Temporal.ZonedDateTime.from(periodStart)
                .add({ [`${this.unit}s`]: this.periodic })

            if (current.start && !next.start) {
                next.start = periodStart
                next.end = periodEnd
                break;
            }

            if (now.epochNanoseconds >= periodStart.epochNanoseconds && now.epochNanoseconds <= periodEnd.epochNanoseconds) {
                current.start = periodStart
                current.end = periodEnd
            }
        }

        const currentResult = current.start && current.end ? current : null
        const nextResult = next.start && next.end ? next : null

        return [currentResult, nextResult] as ClosestPeriodsOptional
    }

    *[Symbol.iterator]() {
        let current = Temporal.ZonedDateTime.from(this.start)

        while (current.epochNanoseconds < this.end.epochNanoseconds) {
            yield current
            current = current.add({ [`${this.unit}s`]: this.periodic })
        }
    }
}

/**
 * Start with two periods: current and next year.
 * Iterate over the periods and narrow down the scope of the periods.
 * If the first (current) period is divided into periods,
 *  then a new current and a new next are taken from them (if possible).
 */
function getClosestPeriods(periodExpressions: PeriodExpression[], timeZone: string): ClosestPeriods {
    const now = Temporal.Now.zonedDateTimeISO(timeZone)

    const currentBoundaries = new PeriodBoundaries(now.year, timeZone)
    const nextBoundaries = new PeriodBoundaries(now.year + 1, timeZone)

    periodExpressions.forEach((pe) => {
        currentBoundaries.narrowStart(pe.key, pe.startOffset)
        currentBoundaries.narrowEnd(pe.key, pe.endOffset)
        currentBoundaries.applyNewValues()
        nextBoundaries.narrowStart(pe.key, pe.startOffset)
        nextBoundaries.narrowEnd(pe.key, pe.endOffset)
        nextBoundaries.applyNewValues()

        if (pe.periodic) {
            let newCurrentBoundaries: null | Boundaries = null
            let newNextBoundaries: null | Boundaries = null

            const isNowAfterStart = now.epochNanoseconds >= currentBoundaries.start.epochNanoseconds
            const isNowBeforeEnd = now.epochNanoseconds <= currentBoundaries.end.epochNanoseconds
            const isNowInCurrent = isNowAfterStart && isNowBeforeEnd

            if (isNowInCurrent) {
                const currentPeriodIterator = new PeriodsIterator(currentBoundaries.start, currentBoundaries.end, pe.key, pe.periodic)
                const [currentScoped, nextScoped] = currentPeriodIterator.getScoped(now)
                if (currentScoped) newCurrentBoundaries = currentScoped
                if (nextScoped) newNextBoundaries = nextScoped
            }

            if (!newCurrentBoundaries || !newNextBoundaries) {
                const nextPeriodIterator = new PeriodsIterator(nextBoundaries.start, nextBoundaries.end, pe.key, pe.periodic)
                const [currentScoped, nextScoped] = nextPeriodIterator.getScoped(now)
                if (currentScoped) newCurrentBoundaries = currentScoped
                if (nextScoped) newNextBoundaries = nextScoped
            }

            if (newCurrentBoundaries) currentBoundaries.fromBoundaries(newCurrentBoundaries)
            if (newNextBoundaries) nextBoundaries.fromBoundaries(newNextBoundaries)
        }
    })

    const first = currentBoundaries.isCollapsed ? null : { start: currentBoundaries.start, end: currentBoundaries.end }
    const second = { start: nextBoundaries.start, end: nextBoundaries.end }

    if (nextBoundaries.isCollapsed) {
        throw new Error('Next period is collapsed')
    }

    return [first, second]
}

function combinePeriods(periodExpressions: PeriodExpression[]) {
    if (periodExpressions.length <= 1) {
        return periodExpressions
    }

    const acc: PeriodExpression[] = []

    periodExpressions.forEach((nextPeriodExpression) => {
        const periodExpression = acc.at(-1)

        if (periodExpression && nextPeriodExpression.key === periodExpression.key) {
            if (nextPeriodExpression.isPeriod || periodExpression.isPeriod) {
                const period = periodExpression.isPeriod ? periodExpression : nextPeriodExpression
                const other = nextPeriodExpression.isPeriod ? periodExpression : nextPeriodExpression
                const canCombineStart = period.startOffset === 0 || other.startOffset === 0
                const canCombineEnd = period.endOffset === 0 || other.endOffset === 0
                if (canCombineStart && canCombineEnd) {
                    const startOffset = period.startOffset + other.startOffset
                    const endOffset = period.endOffset + other.endOffset
                    acc.pop()
                    acc.push({
                        ...period,
                        startOffset,
                        endOffset,
                    })
                    return
                }
            }


        }

        acc.push(nextPeriodExpression)
    })

    return acc
}

function getPeriodOffset(symbolValue: string, isPeriod: boolean) {
    const isBracketed = symbolValue.startsWith('[') && symbolValue.endsWith(']')
    const value = {
        startOffset: 0,
        endOffset: 0,
        periodic: 0,
    }

    if (isBracketed) {
        if (isPeriod) throw new Error('Periodic symbol cannot be bracketed')
        const [start, end] = symbolValue.slice(1, -1).split(',')
        value.startOffset = parseInt(start)
        value.endOffset = parseInt(end)

        return value
    }

    if (isPeriod) {
        value.periodic = parseInt(symbolValue)
    } else {
        value.startOffset = parseInt(symbolValue)
    }

    return value
}

const symbols = {
    M: {
        isPeriod: true,
        key: 'month',
    },
    m: {
        isPeriod: false,
        key: 'month',
    },
    W: {
        isPeriod: true,
        key: 'week',
    },
    w: {
        isPeriod: false,
        key: 'week',
    },
    D: {
        isPeriod: true,
        key: 'day',
    },
    d: {
        isPeriod: false,
        key: 'day',
    },
    H: {
        isPeriod: true,
        key: 'hour',
    },
    h: {
        isPeriod: false,
        key: 'hour',
    },
    I: {
        isPeriod: true,
        key: 'minute',
    },
    i: {
        isPeriod: false,
        key: 'minute',
    },
    S: {
        isPeriod: true,
        key: 'second',
    },
    s: {
        isPeriod: false,
        key: 'second',
    },
}

function getSymbolInfo(symbol: string) {
    const symbolInfo = symbols[symbol as keyof typeof symbols]
    if (!symbolInfo) {
        throw new Error(`Unsupported symbol: ${symbol}`)
    }

    return symbolInfo
}

function parseExpression(operation: string): [string, string] {
    const symbol = operation.slice(-1) // Extract the last character as the symbol
    const numberPart = operation.slice(0, -1) // Extract everything except the last character

    // If the number part is empty, it means only a symbol was provided (e.g., "d")
    if (numberPart === '') {
        return ['1', symbol] // Default to 1 for the number part
    } else if (numberPart === '-') {
        return ['-1', symbol] // If the number part is just "-", it means -1
    } else {
        return [numberPart, symbol] // Parse the number part as an integer
    }
}
