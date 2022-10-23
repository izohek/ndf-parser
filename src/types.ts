// Parser Types

export interface ParserNdfType {
    ndf: string
}

/**
 * An NDF object or object instance.
 *
 * Examples:
 *
 * objectname is <type> ( <content> )
 * export objectname is <type> ( <content> )
 * objectname ( <content> )
 */
export class ParserObject implements ParserNdfType {
    name: string = ''
    type: string = ''
    children: ParserObjectChild[] = []
    ndf: string = 'object'
}

/**
 * Parser attributes and variable definitions
 */
export interface ParserObjectChild {
    name: string
    value: ParserChildValue
}

/**
 * Parser types allowed to be used an ParserObjectChild
 */
export type ParserChildValue =
    ParserArray
    | ParserGuid
    | ParserStringLiteral
    | ParserTildeLiteral
    | ParserObject
    | ParserMap
    | ParserRgbaValue
    | ParserTuple

/**
 * NDF GUID Value
 *
 * Example:
 * `DescriptorId       = GUID:{c4c83faa-1edf-4382-ad7b-f54860eb49f5}`
 */
export interface ParserGuid extends ParserNdfType {
    value: string
    ndf: 'guid'
}

/**
 * Ndf string literal value
 */
export interface ParserStringLiteral extends ParserNdfType {
    value: string
    ndf: 'string'
}

export interface ParserTildeLiteral extends ParserNdfType {
    value: string
    ndf: 'tilde'
}

/**
 * Ndf entity defining an RGBA value
 *
 * Example:
 * `DispersionRadiusOffColor            = RGBA[0,0,0,0]`
 */
export interface ParserRgbaValue extends ParserNdfType {
    name: 'rgba'
    r: number | string
    g: number | string
    b: number | string
    a: number | string
    ndf: 'rgba'
}

/**
 * Ndf map entity
 *
 * Example:
 * `
 * ProductionRessourcesNeeded = MAP [
 *      (~/Resource_CommandPoints, 80),
 *      (~/Resource_Tickets, 4),
 * ]
 * `
 */
export interface ParserMap extends ParserNdfType {
    value: ParserChildValue[]
    ndf: 'map'
}

/**
 * Ndf tuple entity
 *
 * Example:
 * `
 * (~/Descriptor_Deck_Pack_TOE_FR_11e_Para_multi_AML_60_FR, 3)
 * `
 */
export interface ParserTuple extends ParserNdfType {
    value: ParserChildValue[]
    ndf: 'tuple'
}

/**
 * Ndf array entity.
 * Note: Unclear the differences between array and map.
 *
 * Example:
 * `
 * DivisionTags = ['DEFAULT', 'FR', 'Allied', 'infantryReg', 'DC_PWR2']
 * `
 */
export class ParserArray implements ParserNdfType {
    values: ParserChildValue[] = []
    ndf = 'array'
}

// More formal NDF types for outputing
export type NdfToken = NdfObject | NdfConstant
export interface NdfObject {
    name: string
    type: string
    accessLevel: string
    attributes: NdfAttribute[]
    ndf: 'object-parser'
}

export interface NdfConstant {
    name: string
    type: string
    value: string
    ndf: 'constant'
}

export interface NdfAttribute {
    name: string
    value: NdfAttributeType
    ndf: 'attribute'
}

export type NdfAttributeType = NdfArray | NdfLiteral | NdfEntityPath
export type NdfLiteral = string | number
export type NdfEntityPath = string
export interface NdfArray {
    values: [NdfObject]
}
