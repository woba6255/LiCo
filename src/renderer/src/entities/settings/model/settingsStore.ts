import { BehaviorSubject, map } from "rxjs";
import { backendApi } from "shared/backendApi";

type SettingsState = {
    doStartOnLogin: boolean;
}

const initialState: SettingsState = {
    doStartOnLogin: await backendApi.getShowOnLogin() ?? false,
};

const settingsStore$ = new BehaviorSubject(initialState);

export const isStartOnLoginEnabled$ = settingsStore$.pipe(
    map(state => state.doStartOnLogin),
);

export const toggleStartOnLogin = () => {
    const currentState = settingsStore$.getValue();
    backendApi.setShowOnLogin(!currentState.doStartOnLogin);
    settingsStore$.next({ doStartOnLogin: !currentState.doStartOnLogin });
}
