import { useLocation } from 'react-router'
import { selectedPath } from '../utils'

export function useSelectedPath(paths: string[]) {
    const { pathname } = useLocation()
    return selectedPath(pathname, paths)
}
