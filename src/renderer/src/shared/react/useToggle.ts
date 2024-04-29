import React from "react";
import { useEventHandler } from "shared/react";

export function useToggle(initialValue: boolean) {
    const [value, setValue] = React.useState(initialValue);
    const toggle = useEventHandler(() => setValue((prev) => !prev));
    return [value, toggle] as const;
}
