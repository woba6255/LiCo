import React from 'react'
import { useConstant } from 'shared/react'
import { createNodeEditorStore, NodeEditorStoreApi } from '../model'
import { NodeEditorData } from '../types'

const context = React.createContext<NodeEditorStoreApi | null>(null)

type Props = {
    children: React.ReactNode
    initialData: NodeEditorData
}

export function NodeEditorContextProvider({ children, initialData }: Props) {
    const store = useConstant(() => createNodeEditorStore(initialData), [initialData])

    return (
        <context.Provider value={store}>
            {children}
        </context.Provider>
    )
}

export function useNodeEditorStore() {
    const store = React.useContext(context)
    if (!store) {
        throw new Error(`${useNodeEditorStore.name} must be used within a ${NodeEditorContextProvider.name}`)
    }
    return store
}
