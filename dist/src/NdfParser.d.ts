import { NdfAttribute, NdfObject } from "./types";
import { TokenType } from "./NdfTokenizer";
export declare class NdfParser {
    data: string;
    debug: boolean;
    constructor(data: string);
    parse(): (TokenType[] | (NdfObject | import("./types").NdfConstant)[])[];
    decipherTokens(tokens: TokenType[]): (NdfObject | import("./types").NdfConstant)[];
    decipherAttributes(tokens: [{
        name: string;
        value: any;
    }]): NdfAttribute[];
}
