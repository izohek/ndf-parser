// Token Type Literals
export const LineTerminatorSequence = "LineTerminatorSequence"
export const IdentifierType = "IdentifierName"
export const StringLiteralType = "StringLiteral"
export const NumberLiteralType = "NumericLiteral"
export const PunctuatorType = "Punctuator"

// Character and string literals
export const AssignmentToken = '='
export const TildeToken = '~'
export const CommaToken = ','
export const GuidToken = "GUID"
export const GuidTokenColon = ":"
export const ExportToken = "export"
export const ObjectToken = "Object"
export const MapToken = "MAP"
export const TypeDefinitionDelimeter = "is"

// Parser Behavior
export const IgnoredTypes = [
    LineTerminatorSequence,
    "WhiteSpace",
    "SingleLineComment"
]

export const ValueTypes = [
    IdentifierType,
    "NumericLiteral",
    ""
]

export const AccessLevels = [
    "export",
    "private"
]

// Grouped delimeters

export const GuidDelimeter = {
    start: "{",
    end: "}"
}

export const ObjectDelimeter = {
    start: "(",
    end: ")"
}

export const TupleDelimiter = ObjectDelimeter

export const ArrayDelimeter = {
    start: "[",
    end: "]"
}