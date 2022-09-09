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

export type ParserChildValue = ParserArray | ParserGuid | ParserStringLiteral | ParserObject

export type ParserGuid = string
export type ParserStringLiteral = string
export class ParserArray {
    values: ParserChildValue[] = []
}
 
// More formal NDF types for outputing
export interface NdfObject {
    name: string
    type: string
    accessLevel: string
    attributes: NdfAttribute[]
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
