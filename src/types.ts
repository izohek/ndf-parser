export class ParserObject {
    name: string = ""
    type: string = ""
    children: ParserObjectChild[] = []
}

export interface ParserObjectChild {
    name: string,
    value: ParserChildValue
}

export class ParserArray {
    values: string[] = []
}
 
export type ParserChildValue = ParserArray | ParserGuid | ParserStringLiteral
export type ParserGuid = string
export type ParserStringLiteral = string

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
