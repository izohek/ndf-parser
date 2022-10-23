import { NdfAttribute, NdfConstant, NdfObject } from './types';
import { TokenType } from './NdfTokenizer';
export declare class NdfParser {
    data: string;
    debug: boolean;
    constructor(data: string);
    parse(): [TokenType[], Array<NdfObject | NdfConstant>];
    decipherTokens(tokens: TokenType[]): Array<NdfObject | NdfConstant>;
    decipherAttributes(tokens: [{
        name: string;
        value: any;
    }]): NdfAttribute[];
}
