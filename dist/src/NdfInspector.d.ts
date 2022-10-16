export declare const ReservedPaths: string[];
/**
 * Search an object from the parser for a given named sub-object or attribute.
 *
 * @param object
 * @param name
 * @returns
 */
export declare function search(object: any, name: string): any;
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
export declare function findAttribute(object: any, name: string, recurse?: boolean): any;
/**
 * Find nested values in a given object.  The parser outputs a stupid amount of types
 * so this has to check a few different variations of how they're stored.
 *
 * @param object
 * @returns
 */
export declare function getObjectAttributesOrChildren(object: any): any;
/**
 * Get the ndf value of an object.  The parser will assign the type it thinks
 * the object is to the ndf value.
 *
 * @param object
 * @returns
 */
export declare function getObjectNdfValue(object: any): any;
export declare const RecursableTypes: string[];
/**
 * Can the object be recursed?
 *
 * @param value
 * @returns
 */
export declare function isRecursableValue(value: any): boolean;
