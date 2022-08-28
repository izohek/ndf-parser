export declare const token: import("js-tokens").Token[];
export declare const LineTerminatorSequence = "LineTerminatorSequence";
export declare const IgnoredTypes: string[];
export declare const IdentifierType = "IdentifierName";
export declare const AssignmentToken = "=";
export declare const ValueTypes: string[];
export declare const AccessLevels: string[];
export declare const TypeDefinitionDelimeter = "is";
export declare const GuidDelimeter: {
    start: string;
    end: string;
};
export declare const ObjectDelimeter: {
    start: string;
    end: string;
};
export declare const ArrayDelimeter: {
    start: string;
    end: string;
};
export declare const GuidToken = "GUID";
export declare const GuidTokenColon = ":";
export declare const ExportToken = "export";
export declare const StringLiteralType = "StringLiteral";
export declare function parseNdf(str: string): any[];
export declare function tokenize(str: string): import("js-tokens").Token[];
export declare function groupTokens(tokens: any): any[];
export declare function groupTokens2(tokens: any): any[];
