import React from "react";
import { UIStyles } from "./kit";
import { theme } from "shared/ui/theme.ts";

type ThemeProviderProps = {
    children: React.ReactNode;
};


function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <UIStyles.ThemeProvider theme={theme}>
            {children}
        </UIStyles.ThemeProvider>
    );
}

const memo = React.memo(ThemeProvider);
memo.displayName = ThemeProvider.name;
export { memo as ThemeProvider };
