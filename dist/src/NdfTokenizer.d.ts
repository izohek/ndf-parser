import { Token } from "js-tokens";
import { ParserChildValue, ParserObject, ParserObjectChild } from "./types";
export interface TokenType {
    type: string;
    value: any;
}
export declare class NdfTokenizer {
    tokenize(str: string): TokenType[];
    parseTokens(tokens: Token[]): TokenType[];
    parseObject(tokens: any, position: number): [ParserObject, number];
    parseObjectBody(tokens: any, position: number): [ParserObjectChild[], number];
    parseObjectChildValue(tokens: any, position: number): [ParserChildValue, number];
    ffWhiteSpace(tokens: any, position: number): number;
}
