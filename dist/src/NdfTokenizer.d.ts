import { Token } from "js-tokens";
import { ParserTuple, ParserArray, ParserChildValue, ParserMap, ParserObject, ParserObjectChild } from "./types";
export interface TokenType {
    type: string;
    value: any;
}
/**
 * Converts an NDF string into a set of logical tokens.
 */
export declare class NdfTokenizer {
    /**
     * Tokenize an ndf file into understandable, logical tokens.
     *
     * Logical tokens, not syntax tokens.
     *
     * @param str
     * @returns
     */
    tokenize(str: string): TokenType[];
    /**
     * Parse a set of logical tokens from a set of syntax tokens from an
     * ndf file.
     *
     * @param tokens
     * @returns parser results array
     */
    parseTokens(tokens: Token[]): TokenType[];
    /**
     * Parse NDF object
     *
     * @param tokens
     * @param position
     * @returns [parsed object, new parser position]
     */
    parseObject(tokens: any, position: number): [ParserObject, number];
    /**
     * Parse the body of an NDF object
     *
     * @param tokens
     * @param position
     * @returns [object attributes, new parser position]
     */
    parseObjectBody(tokens: any, position: number): [ParserObjectChild[], number];
    /**
     * Parse attribute definitions found in the body of an object
     *
     * @param tokens
     * @param position
     * @returns [parser results, new parser position]
     */
    parseObjectChildValue(tokens: any, position: number): [ParserChildValue, number];
    /**
     * Parse an NDF Array
     *
     * This method supports arrays with included values of Objects or Tilde string/path
     * values.
     *
     * @param arrayString
     * @returns ParserArray
     */
    parseArray(arrayString: string): ParserArray;
    /**
     * Parse a value in the form of : "~:str:" where ":str:" is an arbitrary string.
     * Values with trailing commas will have their trailing comma trimmed.
     *
     * @param tokens
     * @param position
     * @returns [parsed value, new parser position]
     */
    parseTildeValue(tokens: any, position: number): [string, number];
    /**
     * Parse an NDF MAP
     *
     * @param tokens
     * @param position
     * @returns
     */
    parseMap(tokens: any, position: number): [ParserMap, number];
    /**
     * Parse a tuple value like "(Descriptor_Deck_Pack_TOE_US_3rd_Arm_multi_AH1F_Cobra_US, 365)"
     * @param tokens
     * @param position
     * @returns
     */
    parseTuple(tokens: any, position: number): [ParserTuple, number];
    /**
     * Fast forward parser through ignored types including white space and comments.
     *
     * See Constants.IgnoredTypes
     *
     * @param tokens
     * @param position
     * @returns new parser position
     */
    ffWhiteSpace(tokens: any, position: number): number;
}
