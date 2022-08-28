import jsTokens from "js-tokens";
import { ParserArray, ParserChildValue, ParserGuid, ParserObject, ParserObjectChild, ParserStringLiteral } from "./types"

export const token = Array.from(jsTokens("hello, !world"))

export const LineTerminatorSequence = "LineTerminatorSequence"
export const IgnoredTypes = [
    LineTerminatorSequence,
    "WhiteSpace",
    "SingleLineComment"
]

export const IdentifierType = "IdentifierName"
export const AssignmentToken = '='

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

export const GuidToken = "GUID"
export const GuidTokenColon = ":"

export const ExportToken = "export"

export const StringLiteralType = "StringLiteral"

export function parseNdf(str: string) {
    const tokens = tokenize(str)
    const grouped = groupTokens(tokens)

    return grouped
}

export function tokenize(str: string) {
    return Array.from(jsTokens(str))
}

export function groupTokens(tokens: any) {
    const filteredTokens: any[] = []

    const stack = []

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        // console.log(token)
        if (IgnoredTypes.includes(token.type)) {
            continue
        // }
        } else {
            // filteredTokens.push(token)
            if (AccessLevels.includes(token.value)) {
                filteredTokens.push(token)
                const obj = parseObject(tokens, i + 1)

                i = obj[1]
                console.log(obj[0].name ?? "no-name")
                filteredTokens.push({
                    type: "Object",
                    value: obj[0]
                })
            } else {

            }
        }
    }

    return Array.from(filteredTokens)
}

function parseObject(tokens: any, position: number): [ParserObject, number] {
    let currentPos = ffWhiteSpace(tokens, position)

    const obj = new ParserObject()

    if (tokens[currentPos].type == IdentifierType) {
        obj.name = tokens[currentPos].value
        currentPos += 1
    } else {
        throw new Error("Syntax error: expecting object name")
    }

    currentPos = ffWhiteSpace(tokens, currentPos)
    if (tokens[currentPos].value == TypeDefinitionDelimeter) {
        currentPos += 1
        currentPos = ffWhiteSpace(tokens, currentPos)
        obj.type = tokens[currentPos].value
        currentPos += 1

        let [children, index] = parseObjectBody(tokens, currentPos)
        obj.children.push(...children)
        currentPos = index
    }
    
    return [obj, currentPos]
}

function parseObjectBody(tokens: any, position: number): [ParserObjectChild[], number] {

    let currentPos = ffWhiteSpace(tokens, position)
    let children: ParserObjectChild[] = []

    if (tokens[currentPos].value != ObjectDelimeter.start) {
        throw new Error("Syntax error: expecting object starting delimeter")
    }
    currentPos += 1

    while (tokens[currentPos].value != ObjectDelimeter.end) {
        currentPos = ffWhiteSpace(tokens, currentPos)

        if (tokens[currentPos].type != IdentifierType) {
            console.log(tokens[currentPos].type, tokens[currentPos].value)
            throw new Error("Syntax error: expecting object child name")
        }

        let name = tokens[currentPos].value
        
        currentPos += 1
        currentPos = ffWhiteSpace(tokens, currentPos)

        if (tokens[currentPos].value != AssignmentToken) {
            console.log(tokens[currentPos], currentPos)
            throw new Error("Syntax error: expecting object child assignment")
        }
    
        currentPos += 1
        currentPos = ffWhiteSpace(tokens, currentPos)

        let [parsedValue, index] = parseObjectChildValue(tokens, currentPos)

        children.push({
            name: name,
            value: parsedValue
        })
        currentPos = index
    }

    return [children, currentPos]
}

function parseObjectChildValue(tokens: any, position: number): [ParserChildValue, number] {
    if (tokens[position].value == GuidToken) {
        // parse guid
        let guidStr = tokens[position].value
        let currentPos = position + 1
        if (tokens[currentPos].value != GuidTokenColon) {
            throw new Error("Syntax error: malformed guid, needs colon")
        }
        guidStr += tokens[currentPos].value
        currentPos += 1

        if (tokens[currentPos].value != GuidDelimeter.start) {
            console.log(tokens[currentPos].value)
            throw new Error("Syntax error: guid expected guid delimiter start")
        }
        guidStr += tokens[currentPos].value
        currentPos += 1

        while (tokens[currentPos].value != GuidDelimeter.end) {
            guidStr += tokens[currentPos].value
            currentPos += 1
        }

        guidStr += tokens[currentPos].value
        currentPos += 1

        console.log("GUID ", guidStr)
        return [
            guidStr as ParserGuid,
            currentPos
        ]
    } else if (tokens[position].type == StringLiteralType) {
        const value = tokens[position].value
        return [
            value as ParserStringLiteral,
            position + 1
        ]
    } else if (tokens[position].value == "~") {
        let currentPos = position
        let value = ""

        while (tokens[currentPos].type != LineTerminatorSequence) {
            value += tokens[currentPos].value
            currentPos += 1
        }
        console.log("Tilde case end", value)
        return [
            value as ParserStringLiteral,
            currentPos
        ]
    } else {
        let arrayValue = ""
        arrayValue += tokens[position].value
        let stack = [tokens[position].value]
        let currentPos = position + 1
        
        while (stack.length > 0) {
            arrayValue += tokens[currentPos].value
            
            switch (tokens[currentPos].value) {
                case ArrayDelimeter.start:
                    stack.push(tokens[currentPos].value)
                    break
                case ArrayDelimeter.end:
                    stack.pop()
                    break
                }
                
            currentPos += 1
        }
        
        currentPos += 1
        console.log("array", arrayValue)

        return [
            arrayValue as ParserGuid,
            currentPos
        ]
    }
}

function ffWhiteSpace(tokens: any, position: number): number {
    let currentPos = position
    while (IgnoredTypes.includes(tokens[currentPos].type) && currentPos < tokens.length) {
        currentPos += 1
    }
    return currentPos
}

export function groupTokens2(tokens: any) {

    const filteredTokens: any[] = []

    const stack = []

    let exportObj = null

    for (const token of tokens) {
        if (IgnoredTypes.includes(token.type)) {
            continue
        } else {
            filteredTokens.push(token)
        }

        let lastElement = null
        if (stack.length > 0) {
            lastElement = stack[stack.length - 1]
        }

        if (lastElement === null) {
            console.log("null")
        } else if (lastElement instanceof ParserArray) {
            console.log("array")
        } else if (lastElement instanceof ParserObject) {
            console.log("obj")
        }

        switch (token.value) {
            case ExportToken:
                console.log("Export token")
                exportObj = new ParserObject()
                break
            case ObjectDelimeter.start:
                console.log("Object start")
                stack.push(new ParserObject())
                break
            case ObjectDelimeter.end:
                console.log("Object end")
                if (lastElement instanceof ParserObject) {
                    const obj = stack.pop()
                    console.log("Finished obj", obj)
                } else {
                    throw new Error("Syntax error - expected closing object delimiter")
                }
                break
            case ArrayDelimeter.start:
                console.log("Array start")
                stack.push(new ParserArray())
                break
            case ArrayDelimeter.end:
                console.log("Array end")
                if (lastElement instanceof ParserArray) {
                    const arr = stack.pop()
                    console.log("Finished array", arr)
                } else {
                    throw new Error("Syntax error - expected closing array delimiter")
                }
                break
        }
    }

    return Array.from(filteredTokens)
}
