
export const LineTerminatorSequence = "LineTerminatorSequence"
export const IgnoredTypes = [
    LineTerminatorSequence,
    "WhiteSpace",
    "SingleLineComment"
]

export const IdentifierType = "IdentifierName"
export const AssignmentToken = '='
export const GuidToken = "GUID"
export const GuidTokenColon = ":"
export const ExportToken = "export"
export const StringLiteralType = "StringLiteral"
export const ObjectToken = "Object"

export const ValueTypes = [
    IdentifierType,
    "NumericLiteral",
    ""
]

export const AccessLevels = [
    "export",
    "private"
]

export const TypeDefinitionDelimeter = "is"

export const GuidDelimeter = {
    start: "{",
    end: "}"
}

export const ObjectDelimeter = {
    start: "(",
    end: ")"
}

export const ArrayDelimeter = {
    start: "[",
    end: "]"
}