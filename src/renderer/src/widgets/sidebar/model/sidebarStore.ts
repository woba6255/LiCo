import { BehaviorSubject, map } from "rxjs";

type SidebarState = {
    isOpen: boolean;
}

const initialState: SidebarState = {
    isOpen: false,
};

const sidebarStore$ = new BehaviorSubject(initialState);

export const isSidebarOpened$ = sidebarStore$.pipe(
    map(state => state.isOpen),
);

export const toggleSidebar = () => {
    const currentState = sidebarStore$.getValue();
    sidebarStore$.next({ isOpen: !currentState.isOpen });
}
