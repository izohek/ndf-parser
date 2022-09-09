import { NdfAttribute, NdfObject } from "./types";
import { TokenType } from "./NdfTokenizer";
export declare class NdfParser {
    data: string;
    constructor(data: string);
    parse(): (TokenType[] | NdfObject[])[];
    decipherTokens(tokens: TokenType[]): NdfObject[];
    decipherAttributes(tokens: [{
        name: string;
        value: any;
    }]): NdfAttribute[];
}
