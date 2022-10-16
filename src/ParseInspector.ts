
type KeyPath = string[]

export function inspect(object: any, path: KeyPath, index = 0) {
    if (index >= path.length) { return }
    const pathItem = path[index]
    const pathObj = object.attributes.filter((a: any) => {
        return a.name === pathItem
    })
    console.log(object, pathObj)
    return pathItem
}

export function keyPathFromString(kpString: string): KeyPath | null {
    return kpString.split('.');
}