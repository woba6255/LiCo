import { useLocation } from 'react-router'

export function NotFound() {
    const location = useLocation()
    return (
        <div className="flex justify-center items-center h-full w-full">
            <span className="flex flex-row gap-1 p-2">
                <strong>404:</strong>
                <span>{location.pathname}</span>
            </span>
        </div>
    )
}
