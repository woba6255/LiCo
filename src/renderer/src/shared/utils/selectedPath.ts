export const selectedPath = (pathname: string, paths: string[]) => {
    return paths
    .filter((route) => pathname.startsWith(route))
    .sort((a, b) => {
        const aSplit = a.split('/')
        const bSplit = b.split('/')
        if (aSplit.at(-1) === '') aSplit.pop()
        if (bSplit.at(-1) === '') bSplit.pop()
        return bSplit.length - aSplit.length
    })
    .at(0)
}
