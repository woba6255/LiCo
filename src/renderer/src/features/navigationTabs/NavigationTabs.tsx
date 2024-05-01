import { NavLink } from "react-router-dom";
import { Routes } from "shared/routes";
import { Tpg } from "shared/typography";
import { UI } from "shared/ui";

type NavigationTabsProps = {
    tabs: {
        key: string;
        path: Routes;
    }[];
}

export function NavigationTabs({ tabs }: NavigationTabsProps) {
    return (
        <UI.Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            gap={2}
        >
            {
                tabs.map((route) => (
                    <NavLink
                        to={route.path}
                        key={route.path}
                    >
                        {({isActive}) => (
                            <Tpg
                                text={route.key}
                                fontWeight={isActive ? "bold" : "normal"}
                                className={isActive
                                    ? "text-slate-100 underline underline-offset-4"
                                    : "text-slate-200"
                                }
                            />
                        )}
                    </NavLink>
                ))
            }
        </UI.Box>
    );
}
