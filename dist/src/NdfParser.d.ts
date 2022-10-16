import { NdfAttribute } from "./types";
import { TokenType } from "./NdfTokenizer";
export declare class NdfParser {
    data: string;
    debug: boolean;
    constructor(data: string);
    parse(): (TokenType[] | (import("./types").NdfObject | import("./types").NdfConstant)[])[];
    decipherTokens(tokens: TokenType[]): (import("./types").NdfObject | import("./types").NdfConstant)[];
    decipherAttributes(tokens: [{
        name: string;
        value: any;
    }]): NdfAttribute[];
}
