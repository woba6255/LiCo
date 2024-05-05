import { BehaviorSubject, map } from "rxjs";
import { backendApi } from "shared/backendApi";

type State = {
    doStartOnLogin: boolean;
}

const initialState: State = {
    doStartOnLogin: await backendApi.getShowOnLogin() ?? false,
};

const store$ = new BehaviorSubject(initialState);

export const isStartOnLoginEnabled$ = store$.pipe(
    map(state => state.doStartOnLogin),
);

export const toggleStartOnLogin = () => {
    const currentState = store$.getValue();
    backendApi.setShowOnLogin(!currentState.doStartOnLogin);
    store$.next({ doStartOnLogin: !currentState.doStartOnLogin });
}
