import React from "react";
import { TFunction, useTranslation } from "shared/i18n";

type TpgProps = {
    text?: string
    textProperties?: Record<string, string>
    children?: (t: TFunction) => React.ReactNode
}

export function Tpg({ text, textProperties, children }: TpgProps) {
    const { t } = useTranslation();

    if (children) {
        return children(t)
    }

    if (text) {
        return t(text, textProperties)
    }

    return null
}
