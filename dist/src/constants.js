"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayDelimeter = exports.ObjectDelimeter = exports.GuidDelimeter = exports.AccessLevels = exports.ValueTypes = exports.IgnoredTypes = exports.TypeDefinitionDelimeter = exports.ObjectToken = exports.ExportToken = exports.GuidTokenColon = exports.GuidToken = exports.CommaToken = exports.TildeToken = exports.AssignmentToken = exports.PunctuatorType = exports.NumberLiteralType = exports.StringLiteralType = exports.IdentifierType = exports.LineTerminatorSequence = void 0;
// Token Type Literals
exports.LineTerminatorSequence = "LineTerminatorSequence";
exports.IdentifierType = "IdentifierName";
exports.StringLiteralType = "StringLiteral";
exports.NumberLiteralType = "NumericLiteral";
exports.PunctuatorType = "Punctuator";
// Character and string literals
exports.AssignmentToken = '=';
exports.TildeToken = '~';
exports.CommaToken = ',';
exports.GuidToken = "GUID";
exports.GuidTokenColon = ":";
exports.ExportToken = "export";
exports.ObjectToken = "Object";
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
exports.ArrayDelimeter = {
    start: "[",
    end: "]"
};
