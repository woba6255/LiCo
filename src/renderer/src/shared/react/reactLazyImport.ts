import React from "react";
import { KeysLeadingToType } from "shared/types";

// This function is used to lazy import a module without using the default export;
export function reactLazyImport<
    T extends object,
    K extends KeysLeadingToType<T, React.ComponentType>
>(
    importModule: () => Promise<T>,
    name: K
) {
    return React.lazy(async () => {
        const module = await importModule();
        return ({ default: module[name] }) as { default: React.ComponentType };
    }) as T[K];
}
