import { CHANNELS } from 'common/Channels'
import { EventNodeDataByType, EventNodeType, IEventNode, ITask, IWorkbench } from 'common/Entities'
import { ipcMain } from 'electron'
import { InterfaceToType, store } from '../App/store'

class EntitiesManager {
    public onAppReady() {
        ipcMain.handle(CHANNELS.GET_WORKBENCHES, () => {
            return this.getWorkbenches()
        })

        ipcMain.handle(CHANNELS.SET_WORKBENCH, (_, workbench) => {
            return this.setWorkbench(workbench)
        })

        ipcMain.handle(CHANNELS.DELETE_WORKBENCH, (_, id) => {
            return this.deleteWorkbench(id)
        })
    }

    public async onAppInit() {
        const state = await this.getWorkbenches()
        const objectives = Objective.fromObject(state)
    }

    private getWorkbenches() {
        return store.workbenches.get()
    }

    private setWorkbench(workbench: IWorkbench) {
        return store.workbenches[workbench.id].set(workbench as InterfaceToType<IWorkbench>)
    }

    private deleteWorkbench(id: string) {
        return store.workbenches[id].delete()
    }
}

export const entitiesManager = new EntitiesManager()


class Objective implements IWorkbench {
    id: string
    name: string
    description: string
    status: 'active' | 'complete' | 'failed' | 'canceled' | 'idle'
    nodes: EventNode[]

    constructor(properties: IWorkbench) {
        this.id = properties.id
        this.name = properties.name
        this.description = properties.description
        this.status = properties.status
        this.nodes = properties.nodes.map((node) => new EventNode(node))
    }

    get entryPoints() {
        return this.nodes.filter((node) => node.isEntryPoint)
    }

    get tasks() {
        const entryPoints = this.entryPoints
        const taskPoints = entryPoints.flatMap(this.getTaskPoints.bind(this))
        return [...entryPoints, ...taskPoints].map(this.createTask.bind(this))
    }

    static fromObject(object: Record<string, IWorkbench>): Objective[] {
        const values = Object.values(object)

        return values.map((value) => new Objective(value))
    }

    getNodeById(id: string) {
        return this.nodes.find((node) => node.id === id)
    }

    getTaskPoints(node: EventNode) {
        return node.children
        .map((id) => this.getNodeById(id)!)
        .filter((node) => node.isTaskPoint)
    }

    createTask(node: EventNode): ITask {
        return {
            id: `${this.id}-${node.id}`,
            workbenchId: this.id,
            nodeId: node.id,
            releaseTime: -1,
        }
    }
}

class EventNode<T extends EventNodeType = EventNodeType> implements IEventNode {
    id: string
    type: T
    name?: string
    description?: string
    releaseDate?: string
    position: string
    children: string[]
    data: EventNodeDataByType[T]
    size: string | undefined

    constructor(properties: IEventNode<false, T>) {
        this.id = properties.id
        this.type = properties.type
        this.name = properties.name
        this.description = properties.description
        this.releaseDate = properties.releaseDate
        this.position = properties.position
        this.children = properties.children
        this.data = properties.data
        this.size = properties.size
    }

    get isEntryPoint() {
        return this.type === EventNodeType.DATE
    }

    get isTaskPoint() {
        return this.type === EventNodeType.RELATIVE
            || this.type === EventNodeType.DATE
    }
}

type PeriodExpression = {
    isPeriod: boolean,
    periodic?: number,
    startOffset: number,
    endOffset: number,
    key: string,
}

function formulaToTime(formula: string) {
    const periods: PeriodExpression[] = formula
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

    const timeZone = Temporal.Now.timeZoneId()
    const combinedPeriods = combinePeriods(periods)
    const currentPeriod = getCurrentPeriod(combinedPeriods, timeZone)
}

function getCurrentPeriod(periods: PeriodExpression[], timeZone: string) {
    const now = Temporal.Now.zonedDateTimeISO(timeZone)
    const currentStart = Temporal.ZonedDateTime.from({
        year: now.year,
        month: 1,
        day: 1,
        timeZone: timeZone,
    })

    const currentEnd = Temporal.ZonedDateTime.from({
        year: now.year + 1,
        month: 1,
        day: 1,
        timeZone: timeZone,
    }).add({ nanoseconds: -1 })

    const nextStart = Temporal.ZonedDateTime.from({
        year: now.year + 1,
        month: 1,
        day: 1,
        timeZone: timeZone,
    })

    const nextEnd = Temporal.ZonedDateTime.from({
        year: now.year + 2,
        month: 1,
        day: 1,
        timeZone: timeZone,
    }).add({ nanoseconds: -1 })

    const periodBoundaries = {
        current: { start: currentStart, end: currentEnd },
        next: { start: nextStart, end: nextEnd },
    }

    function addTo(
        period: 'current' | 'next',
        start: 'start' | 'end',
        key: string,
        value: number
    ) {
        if (value === 0) return
        const doCopy = (start === 'end' && value > 0) || (start === 'start' && value < 0)
        const operation = value > 0 ? 'add' : 'subtract'
        const offset = value > 0 ? value : value * -1
        const periodBoundary = periodBoundaries[period]

        if (doCopy) {
            const copy = Temporal.ZonedDateTime.from(periodBoundary[start])
            copy[operation]({ [key]: offset })
            periodBoundary[start] = copy
            return
        }

        periodBoundary[start][operation]({ [key]: offset })
    }

    periods.forEach((period) => {
        // simple way
        if (!period.isPeriod) {
            addTo('current', 'start', period.key, period.startOffset)
            addTo('current', 'end', period.key, period.endOffset)
            addTo('next', 'start', period.key, period.startOffset)
            addTo('next', 'end', period.key, period.endOffset)
            return
        }


    })
}


function combinePeriods(periods: PeriodExpression[]) {
    if (periods.length <= 1) {
        return periods
    }

    const acc: PeriodExpression[] = []

    periods.forEach((nextPeriod) => {
        const period = acc.at(-1)

        if (!period) {
            acc.push(nextPeriod)
            return
        }

        if (canCombine(period, nextPeriod)) {
            const combinedPeriod: PeriodExpression = {
                ...period,
                startOffset: Math.min(period.startOffset, nextPeriod.startOffset),
                endOffset: Math.max(period.endOffset, nextPeriod.endOffset),
            }

            acc.pop()
            acc.push(combinedPeriod)
        } else {
            acc.push(nextPeriod)
        }

    })

    return acc
}

function canCombine(period: PeriodExpression, nextPeriod: PeriodExpression) {
    if (period.key !== nextPeriod.key) {
        return false
    }

    const hasPeriod = period.isPeriod || nextPeriod.isPeriod
    const hasFalsyPeriod = !period.isPeriod || !nextPeriod.isPeriod

    if (hasPeriod && hasFalsyPeriod) {
        const hasZeroStart = [period.startOffset, nextPeriod.startOffset].includes(0)
        const hasZeroEnd = [period.endOffset, nextPeriod.endOffset].includes(0)
        const startsNotEqual = period.startOffset !== nextPeriod.startOffset
        const endsNotEqual = period.endOffset !== nextPeriod.endOffset

        if (hasZeroStart && hasZeroEnd && startsNotEqual && endsNotEqual) {
            return true
        }
    }

    return false
}

function getPeriodOffset(symbolValue: string, isPeriod: boolean) {
    const isBracketed = symbolValue.startsWith('[') && symbolValue.endsWith(']')
    let startOffset = 0
    let endOffset = 0
    let periodic = 0

    if (isBracketed) {
        const [start, end] = symbolValue.slice(1, -1).split(',')
        startOffset = parseInt(start)
        endOffset = parseInt(end)
    }
    if (isPeriod) {
        periodic = parseInt(symbolValue)
    } else {
        startOffset = parseInt(symbolValue)
    }

    return { startOffset, endOffset, periodic }
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
