"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRecursableValue = exports.RecursableTypes = exports.getObjectNdfValue = exports.getObjectAttributesOrChildren = exports.findAttribute = exports.search = exports.ReservedPaths = void 0;
/// Parser constant attribute values
exports.ReservedPaths = [
    'name',
    'attributes',
    'type',
    'accessLevel'
];
/**
 * Search an object from the parser for a given named sub-object or attribute.
 *
 * @param object
 * @param name
 * @returns
 */
function search(object, name) {
    let found = null;
    if (exports.ReservedPaths.includes(name)) {
        return object[name];
    }
    else {
        found = findAttribute(object, name);
    }
    return found;
}
exports.search = search;
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
function findAttribute(object, name, recurse = true) {
    const children = getObjectAttributesOrChildren(object);
    const found = children.filter((a) => a.name === name);
    if (found && found.length > 0) {
        return found;
    }
    if (recurse) {
        for (const attribute of children) {
            if (isRecursableValue(getObjectNdfValue(attribute))) {
                const recurseFound = findAttribute(attribute, name, recurse);
                if (recurseFound && recurseFound.length > 0) {
                    return recurseFound;
                }
            }
        }
    }
    return found;
}
exports.findAttribute = findAttribute;
/**
 * Find nested values in a given object.  The parser outputs a stupid amount of types
 * so this has to check a few different variations of how they're stored.
 *
 * @param object
 * @returns
 */
function getObjectAttributesOrChildren(object) {
    if (Object.keys(object).includes('attributes')) {
        return object.attributes;
    }
    else if (object.value) {
        return [object.value];
    }
    else if (object.values) {
        return object.values;
    }
    else if (object.children !== undefined) {
        return object.children;
    }
    else {
        return [];
    }
}
exports.getObjectAttributesOrChildren = getObjectAttributesOrChildren;
/**
 * Get the ndf value of an object.  The parser will assign the type it thinks
 * the object is to the ndf value.
 *
 * @param object
 * @returns
 */
function getObjectNdfValue(object) {
    if (object.ndf) {
        return object.ndf;
    }
    else if (object.value && object.value.ndf) {
        return object.value.ndf;
    }
    else {
        return '';
    }
}
exports.getObjectNdfValue = getObjectNdfValue;
/// Ndf values which indicate an object has potential nested children
exports.RecursableTypes = ['array', 'object', 'map', 'tuple', 'attribute'];
/**
 * Can the object be recursed?
 *
 * @param value
 * @returns
 */
function isRecursableValue(value) {
    return exports.RecursableTypes.includes(value);
}
exports.isRecursableValue = isRecursableValue;
