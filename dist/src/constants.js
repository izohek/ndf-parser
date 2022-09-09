"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayDelimeter = exports.ObjectDelimeter = exports.GuidDelimeter = exports.TypeDefinitionDelimeter = exports.AccessLevels = exports.ValueTypes = exports.ObjectToken = exports.StringLiteralType = exports.ExportToken = exports.GuidTokenColon = exports.GuidToken = exports.AssignmentToken = exports.IdentifierType = exports.IgnoredTypes = exports.LineTerminatorSequence = void 0;
exports.LineTerminatorSequence = "LineTerminatorSequence";
exports.IgnoredTypes = [
    exports.LineTerminatorSequence,
    "WhiteSpace",
    "SingleLineComment"
];
exports.IdentifierType = "IdentifierName";
exports.AssignmentToken = '=';
exports.GuidToken = "GUID";
exports.GuidTokenColon = ":";
exports.ExportToken = "export";
exports.StringLiteralType = "StringLiteral";
exports.ObjectToken = "Object";
exports.ValueTypes = [
    exports.IdentifierType,
    "NumericLiteral",
    ""
];
exports.AccessLevels = [
    "export",
    "private"
];
exports.TypeDefinitionDelimeter = "is";
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
