/// Parser constant attribute values
export const ReservedPaths = [
    'name',
    'attributes',
    'type',
    'accessLevel'
]

/**
 * Search an object from the parser for a given named sub-object or attribute.
 *
 * @param object
 * @param name
 * @returns
 */
export function search (object: any, name: string): any {
    let found = null
    if (ReservedPaths.includes(name)) {
        return object[name]
    } else {
        found = findAttribute(object, name)
    }

    return found
}

/**
 * Search an objects attributes for a given named value.  Can recurse into values with
 * children and subvalues like arrays, tuples, or maps.
 *
 * @param object
 * @param name
 * @param recurse
 * @param depth
 * @returns
 */
export function findAttribute (object: any, name: string, recurse = true): any {
    const children = getObjectAttributesOrChildren(object)
    const found = children.filter((a: any) => a.name === name)

    if ((found?.length ?? -1) > 0) {
        return found
    }

    if (recurse) {
        for (const attribute of children) {
            if (isRecursableValue(getObjectNdfValue(attribute))) {
                const recurseFound = findAttribute(attribute, name, recurse)
                if ((recurseFound?.length ?? -1) > 0) {
                    return recurseFound
                }
            }
        }
    }

    return found
}

/**
 * Find nested values in a given object.  The parser outputs a stupid amount of types
 * so this has to check a few different variations of how they're stored.
 *
 * @param object
 * @returns
 */
export function getObjectAttributesOrChildren (object: any): any {
    if (Object.keys(object).includes('attributes')) {
        return object.attributes
    } else if (object.value != null) {
        return [object.value]
    } else if (object.values != null) {
        return object.values
    } else if (object.children !== undefined) {
        return object.children
    } else {
        return []
    }
}

/**
 * Get the ndf value of an object.  The parser will assign the type it thinks
 * the object is to the ndf value.
 *
 * @param object
 * @returns
 */
export function getObjectNdfValue (object: any): string {
    if (object.ndf != null) {
        return object.ndf
    } else if (object.value?.ndf != null) {
        return object.value.ndf
    } else {
        return ''
    }
}

/// Ndf values which indicate an object has potential nested children
export const RecursableTypes = ['array', 'object', 'map', 'tuple', 'attribute']
/**
 * Can the object be recursed?
 *
 * @param value
 * @returns
 */
export function isRecursableValue (value: any): boolean {
    return RecursableTypes.includes(value)
}
