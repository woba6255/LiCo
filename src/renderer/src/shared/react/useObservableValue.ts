import React from 'react'
import { BehaviorSubject, Observable } from 'rxjs'
import { useConstant } from './useConstant'
import { useEventHandler } from './useEventHandler'

const NONE = Symbol('NONE')

/**
 * Hook for automatically subscribing and unsubscribing from an Observable.
 * If the Observable synchronously returns a value, it returns it.
 * If initialValue is NONE and the Observable does not synchronously return a value,
 *   then it throws an error.
 * If the value of the Observable changes, it resubscribes.
 * If a value equivalent to the previous one arrives in the Observable,
 *   the previous value is returned without triggering a re-render.
 * @param input$ Observable.
 * @param initialValue Initial value that will be used before the Observable emits a value.
 */
export function useObservableValue<T>(
    input$: Observable<T>,
    initialValue: T | typeof NONE = NONE,
): T {
    const subject$ = useConstant(() => {
        const subject = new BehaviorSubject<T | typeof NONE>(NONE)

        const s = input$.subscribe((v) => {
            subject.next(v)
        })

        s.unsubscribe()

        return subject
    }, [input$])

    React.useEffect(() => {
        return () => {
            subject$.complete()
        }
    }, [subject$])

    const subscribe = React.useCallback((updateStore: () => void) => {
        const subscription = input$.subscribe((v) => {
            if (subject$.getValue() === v) {
                return
            }

            subject$.next(v)
            updateStore()
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [input$, subject$])

    const getSnapshot = useEventHandler(() => subject$.getValue())

    let value = React.useSyncExternalStore(subscribe, getSnapshot)

    if (value === NONE) {
        value = initialValue
    }

    if (value === NONE) {
        throw new Error('Observable did not return a value and no initial value provided')
    }

    return value
}
