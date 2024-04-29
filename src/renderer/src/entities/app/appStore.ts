import { BehaviorSubject, map } from "rxjs";

type AppState = {
    isSideBarOpen: boolean;
}

const initialState: AppState = {
    isSideBarOpen: false,
};

const appStore$ = new BehaviorSubject(initialState);

export const isAppSidebarOpened$ = appStore$.pipe(
    map(state => state.isSideBarOpen),
);

export const toggleAppSidebar = () => {
    const currentState = appStore$.getValue();
    appStore$.next({ isSideBarOpen: !currentState.isSideBarOpen });
}
