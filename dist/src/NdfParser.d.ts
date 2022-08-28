export declare class NdfParser {
    data: string;
    tokens: any;
    parserPosition: number;
    constructor(data: string);
    parse(): any[];
    private tokenize;
    private parseTokens;
    private parseObject;
    private parseObjectBody;
    private parseObjectChildValue;
    private ffWhiteSpace;
    private currentToken;
    private incrementPosition;
}
