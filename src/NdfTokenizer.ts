import jsTokens, { Token } from "js-tokens";
import { ParserArray, ParserChildValue, ParserGuid, ParserObject, ParserObjectChild, ParserStringLiteral } from "./types"
import * as Constants from "./constants"

export interface TokenType {
    type: string
    value: any
}

export class NdfTokenizer {

    public tokenize(str: string) {
        let tokens = Array.from(jsTokens(str))
        return this.parseTokens(tokens)
    }

    public parseTokens(tokens: Token[]): TokenType[] {
        const filteredTokens: TokenType[] = []

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i]
            if (Constants.IgnoredTypes.includes(token.type)) {
                continue
            } else {
                // filteredTokens.push(token)
                if (Constants.AccessLevels.includes(token.value)) {
                    filteredTokens.push(token)
                    const obj = this.parseObject(tokens, i + 1)
    
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

    public parseObject(tokens: any, position: number): [ParserObject, number] {
        let currentPos = this.ffWhiteSpace(tokens, position)

        const obj = new ParserObject()

        if (tokens[currentPos].type == Constants.IdentifierType) {
            obj.name = tokens[currentPos].value
            currentPos += 1
        } else {
            throw new Error("Syntax error: expecting object name")
        }

        currentPos = this.ffWhiteSpace(tokens, currentPos)
        if (tokens[currentPos].value == Constants.TypeDefinitionDelimeter) {
            currentPos += 1
            currentPos = this.ffWhiteSpace(tokens, currentPos)
            obj.type = tokens[currentPos].value
            currentPos += 1

            let [children, index] = this.parseObjectBody(tokens, currentPos)
            obj.children.push(...children)
            currentPos = index
        }
        
        return [obj, currentPos]
    }

    public parseObjectBody(tokens: any, position: number): [ParserObjectChild[], number] {

        let currentPos = this.ffWhiteSpace(tokens, position)
        let children: ParserObjectChild[] = []
    
        if (tokens[currentPos].value != Constants.ObjectDelimeter.start) {
            throw new Error("Syntax error: expecting object starting delimeter")
        }
        currentPos += 1
    
        while (tokens[currentPos].value != Constants.ObjectDelimeter.end) {
            currentPos = this.ffWhiteSpace(tokens, currentPos)
    
            if (tokens[currentPos].type != Constants.IdentifierType) {
                console.log(tokens[currentPos].type, tokens[currentPos].value)
                throw new Error("Syntax error: expecting object child name")
            }
    
            let name = tokens[currentPos].value
            
            currentPos += 1
            currentPos = this.ffWhiteSpace(tokens, currentPos)
    
            if (tokens[currentPos].value != Constants.AssignmentToken) {
                console.log(tokens[currentPos], currentPos)
                throw new Error("Syntax error: expecting object child assignment")
            }
        
            currentPos += 1
            currentPos = this.ffWhiteSpace(tokens, currentPos)
    
            let [parsedValue, index] = this.parseObjectChildValue(tokens, currentPos)
    
            children.push({
                name: name,
                value: parsedValue
            })
            currentPos = index
        }
    
        return [children, currentPos]
    }

    public parseObjectChildValue(tokens: any, position: number): [ParserChildValue, number] {
        if (tokens[position].value == Constants.GuidToken) {
            // parse guid
            let guidStr = tokens[position].value
            let currentPos = position + 1
            if (tokens[currentPos].value != Constants.GuidTokenColon) {
                throw new Error("Syntax error: malformed guid, needs colon")
            }
            guidStr += tokens[currentPos].value
            currentPos += 1
    
            if (tokens[currentPos].value != Constants.GuidDelimeter.start) {
                console.log(tokens[currentPos].value)
                throw new Error("Syntax error: guid expected guid delimiter start")
            }
            guidStr += tokens[currentPos].value
            currentPos += 1
    
            while (tokens[currentPos].value != Constants.GuidDelimeter.end) {
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
        } else if (tokens[position].type == Constants.StringLiteralType) {
            const value = tokens[position].value
            return [
                value as ParserStringLiteral,
                position + 1
            ]
        } else if (tokens[position].value == "~") {
            let currentPos = position
            let value = ""
    
            while (tokens[currentPos].type != Constants.LineTerminatorSequence) {
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
                    case Constants.ArrayDelimeter.start:
                        stack.push(tokens[currentPos].value)
                        break
                    case Constants.ArrayDelimeter.end:
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
        
    public ffWhiteSpace(tokens: any, position: number): number {
        let currentPos = position
        while (Constants.IgnoredTypes.includes(tokens[currentPos].type) && currentPos < tokens.length) {
            currentPos += 1
        }
        return currentPos
    }
}