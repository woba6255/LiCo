import React from "react";
import { TFunction, useTranslation } from "shared/i18n";
import { UI } from "shared/ui";

type TpgProps = UI.TypographyProps & {
    text?: string
    textProperties?: Record<string, string>
    children?: (t: TFunction) => React.ReactNode
}

export function Tpg({ text, textProperties, children, ...props }: TpgProps) {
    const { t } = useTranslation();

    return (
        <UI.Typography
            {...props}
        >
            {text && t(text, textProperties)}
            {children && children(t)}
        </UI.Typography>
    )
}
