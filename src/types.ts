// Parser Types
export class ParserObject {
    name: string = ""
    type: string = ""
    children: ParserObjectChild[] = []
}

export interface ParserObjectChild {
    name: string,
    value: ParserChildValue
}

export type ParserChildValue = ParserArray | ParserGuid | ParserStringLiteral | ParserObject | ParserMap

export type ParserGuid = string
export type ParserStringLiteral = string
export type ParserMap = ParserChildValue[]
export type ParserTuple = ParserChildValue[]
export class ParserArray {
    values: ParserChildValue[] = []
}
 
// More formal NDF types for outputing
export type NdfToken = NdfObject | NdfConstant
export interface NdfObject {
    name: string
    type: string
    accessLevel: string
    attributes: NdfAttribute[]
}

export interface NdfConstant {
    name: string
    type: string
    value: string
}

export interface NdfAttribute {
    name: string
    value: NdfAttributeType
}

export type NdfAttributeType = NdfArray | NdfLiteral | NdfEntityPath
export type NdfLiteral = string | number
export type NdfEntityPath = string
export type NdfArray = {
    values: [NdfObject]
}
