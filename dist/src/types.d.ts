export declare class ParserObject {
    name: string;
    type: string;
    children: ParserObjectChild[];
}
export interface ParserObjectChild {
    name: string;
    value: ParserChildValue;
}
export declare class ParserArray {
    values: string[];
}
export declare type ParserChildValue = ParserArray | ParserGuid | ParserStringLiteral;
export declare type ParserGuid = string;
export declare type ParserStringLiteral = string;
