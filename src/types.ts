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
