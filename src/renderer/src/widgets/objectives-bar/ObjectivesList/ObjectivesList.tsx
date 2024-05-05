import { useNavigate } from 'react-router'
import { useObservableValue } from 'shared/react'
import { allObjectives$ } from 'entities/objective'
import { Tpg, UI } from 'shared/ui'
import { detailedRoute, PossibleRoutes } from 'shared/routes'
import { ObjectiveItemMenu } from './ObjectiveItemMenu.tsx'

import styles from './Objective.module.css'

export function ObjectivesList() {
    const objectives = useObservableValue(allObjectives$)
    const navigate = useNavigate()

    return (
        <div className="flex flex-col w-full h-full">
            <UI.Listbox
                label="Objectives"
                variant="flat"
                emptyContent={<Tpg text={'objective.list.empty'} />}
            >
                {
                    objectives.map((objective) => (
                        <UI.ListboxItem
                            textValue={objective.name}
                            key={objective.id}
                            className={styles.item}
                            onClick={() => {
                                navigate(detailedRoute(PossibleRoutes.OBJECTIVE_NODE_EDITOR, objective.id))
                            }}
                            endContent={(
                                <ObjectiveItemMenu
                                    objective={objective}
                                />
                            )}
                        >
                            {objective.name}
                        </UI.ListboxItem>
                    ))
                }
            </UI.Listbox>
        </div>
    )
}
