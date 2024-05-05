import React from 'react'
import { of } from 'rxjs'
import { useObservableValue } from 'shared/react'
import { getObjectiveById$ } from '../model'

export function useObjectiveById(workbenchId: string | null | undefined) {
    const workbench$ = React.useMemo(() => {
        if (workbenchId) {
            return getObjectiveById$(of(workbenchId))
        }
        return of(null)
    }, [workbenchId])

    return useObservableValue(workbench$)
}
