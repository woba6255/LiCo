import { BehaviorSubject, map } from 'rxjs'


type State = {
    isOpen: boolean;
}

const initialState: State = {
    isOpen: true,
}

const store = new BehaviorSubject(initialState)

export const isObjectiveBarOpen$ = store.pipe(
    map(state => state.isOpen)
)

export const toggleObjectiveBar = () => {
    store.next({
        ...store.value,
        isOpen: !store.value.isOpen
    })
}
