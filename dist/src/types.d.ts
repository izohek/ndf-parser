export declare class ParserObject {
    name: string;
    type: string;
    children: ParserObjectChild[];
}
export interface ParserObjectChild {
    name: string;
    value: ParserChildValue;
}
export declare type ParserChildValue = ParserArray | ParserGuid | ParserStringLiteral | ParserObject | ParserMap;
export declare type ParserGuid = string;
export declare type ParserStringLiteral = string;
export declare type ParserMap = ParserChildValue[];
export declare type ParserTuple = ParserChildValue[];
export declare class ParserArray {
    values: ParserChildValue[];
}
export interface NdfObject {
    name: string;
    type: string;
    accessLevel: string;
    attributes: NdfAttribute[];
}
export interface NdfAttribute {
    name: string;
    value: NdfAttributeType;
}
export declare type NdfAttributeType = NdfArray | NdfLiteral | NdfEntityPath;
export declare type NdfLiteral = string | number;
export declare type NdfEntityPath = string;
export declare type NdfArray = {
    values: [NdfObject];
};
