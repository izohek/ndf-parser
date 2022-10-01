"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayDelimeter = exports.TupleDelimiter = exports.ObjectDelimeter = exports.GuidDelimeter = exports.AccessLevels = exports.ValueTypes = exports.IgnoredTypes = exports.TypeDefinitionDelimeter = exports.MapToken = exports.ObjectToken = exports.ExportToken = exports.ConstantToken = exports.GuidTokenColon = exports.GuidToken = exports.CommaToken = exports.TildeToken = exports.AssignmentToken = exports.NegativeNumberToken = exports.RegularExpressionType = exports.PunctuatorType = exports.NumberLiteralType = exports.StringLiteralType = exports.IdentifierType = exports.LineTerminatorSequence = void 0;
// Token Type Literals
exports.LineTerminatorSequence = "LineTerminatorSequence";
exports.IdentifierType = "IdentifierName";
exports.StringLiteralType = "StringLiteral";
exports.NumberLiteralType = "NumericLiteral";
exports.PunctuatorType = "Punctuator";
exports.RegularExpressionType = "RegularExpressionLiteral";
// Character and string literals
exports.NegativeNumberToken = "-";
exports.AssignmentToken = '=';
exports.TildeToken = '~';
exports.CommaToken = ',';
exports.GuidToken = "GUID";
exports.GuidTokenColon = ":";
exports.ConstantToken = "Constant";
exports.ExportToken = "export";
exports.ObjectToken = "Object";
exports.MapToken = "MAP";
exports.TypeDefinitionDelimeter = "is";
// Parser Behavior
exports.IgnoredTypes = [
    exports.LineTerminatorSequence,
    "WhiteSpace",
    "SingleLineComment"
];
exports.ValueTypes = [
    exports.IdentifierType,
    "NumericLiteral",
    ""
];
exports.AccessLevels = [
    "export",
    "private"
];
// Grouped delimeters
exports.GuidDelimeter = {
    start: "{",
    end: "}"
};
exports.ObjectDelimeter = {
    start: "(",
    end: ")"
};
exports.TupleDelimiter = exports.ObjectDelimeter;
exports.ArrayDelimeter = {
    start: "[",
    end: "]"
};
