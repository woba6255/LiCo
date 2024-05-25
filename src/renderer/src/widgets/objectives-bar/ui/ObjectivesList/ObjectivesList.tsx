import React from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { useObservableValue, useSelectedPath } from 'shared/react'
import { Tpg, UI, cn } from 'shared/ui'
import { detailedRoute, PossibleRoutes } from 'shared/routes'
import { allObjectives$ } from 'entities/objective'
import { ObjectiveItemMenu } from './ObjectiveItemMenu'

import styles from './Objective.module.css'

const list = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0,
            duration: 0,
        },
    },
}

const item = {
    hidden: {
        opacity: 0,
        rotate: -6,
        width: '90%',
        x: 3,
        y: 15,
    },
    show: {
        opacity: 1,
        rotate: 0,
        width: 'auto',
        x: 0,
        y: 0,
        transition: {
            duration: 0.25,
        },
    },
}

export function ObjectivesList() {
    const objectives = useObservableValue(allObjectives$)
    const navigate = useNavigate()

    const objectivesPrepared = React.useMemo(
        () => objectives.map((objective) => {
            return {
                objective,
                key: objective.id,
                label: objective.name,
                path: detailedRoute(PossibleRoutes.OBJECTIVE_DETAIL, objective.id),
                onClick: () => {
                    navigate(detailedRoute(PossibleRoutes.OBJECTIVE_NODE_EDITOR, objective.id))
                },
            }
        }),
        [navigate, objectives],
    )

    const selectedPath = useSelectedPath(
        objectivesPrepared.map((prepared) => prepared.path),
    )

    return (
        <motion.div
            variants={list}
            initial="hidden"
            animate="show"
            className="flex flex-col w-full h-full"
        >
            <UI.Listbox
                label="Objectives"
                variant="flat"
                emptyContent={<Tpg text={'objective.list.empty'}/>}
                classNames={{
                    list: 'gap-0'
                }}
            >
                {
                    objectivesPrepared.map((prepared) => (
                        <UI.ListboxItem
                            key={prepared.path}
                            className={cn(
                                styles.item,
                                selectedPath === prepared.path && styles.selected,
                            )}
                            shouldHighlightOnFocus={false}
                            onClick={prepared.onClick}
                            as={motion.li}
                            // @ts-ignore
                            variants={item}
                            endContent={(
                                <ObjectiveItemMenu
                                    objective={prepared.objective}
                                />
                            )}
                        >
                            {prepared.label}
                        </UI.ListboxItem>
                    ))
                }
            </UI.Listbox>
        </motion.div>
    )
}
