import { useNavigate, NavigateFunction } from 'react-router'
import { PossibleRoutes, detailedRoute } from 'shared/routes'
import { Icons, Tpg, UI, cn } from 'shared/ui'
import { useTranslation } from 'shared/i18n'
import { deleteObjective, Objective } from 'entities/objective'

import styles from './Objective.module.css'

const menu = [{
    key: 'common.edit',
    onClick: (objective: Objective, navigate: NavigateFunction) => navigate(
        detailedRoute(PossibleRoutes.OBJECTIVE_DETAIL, objective.id),
    ),
}, {
    key: 'common.delete',
    danger: true,
    onClick: (objective: Objective) => deleteObjective(objective.id),
}]

type ObjectiveItemMenu = {
    objective: Objective;
}

export function ObjectiveItemMenu({ objective }: ObjectiveItemMenu) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <UI.Dropdown.Root>
            <UI.Dropdown.Trigger>
                <UI.Button
                    variant="light"
                    isIconOnly
                    onClick={(e) => e.stopPropagation()}
                    className={cn(styles.moreButton, 'text-medium')}
                >
                    <Icons.MoreOutlined />
                </UI.Button>
            </UI.Dropdown.Trigger>
            <UI.Dropdown.Menu
                aria-label="Objective menu"
            >
                {
                    menu.map((item) => (
                        <UI.Dropdown.Item
                            color={item.danger ? 'danger' : 'default'}
                            className={cn(item.danger && 'text-danger')}
                            textValue={t(item.key)}
                            key={item.key}
                            onClick={() => item.onClick(objective, navigate)}
                        >
                            <Tpg text={item.key}/>
                        </UI.Dropdown.Item>
                    ))
                }
            </UI.Dropdown.Menu>
        </UI.Dropdown.Root>
    )
}
