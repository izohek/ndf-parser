import jsTokens from "js-tokens";
import { ParserArray, ParserChildValue, ParserGuid, ParserObject, ParserObjectChild, ParserStringLiteral } from "./types"
import * as Constants from "./constants"

export class NdfParser {

    data: string
    tokens: any
    parserPosition: number = 0
    
    constructor(data: string) {
        this.data = data
    }

    public parse() {
        this.tokens = this.tokenize(this.data)

        return this.parseTokens()
    }

    private tokenize(str: string) {
        return Array.from(jsTokens(str))
    }

    private parseTokens() {
        const filteredTokens: any[] = []

        const stack = []

        for (this.parserPosition = 0; this.parserPosition < this.tokens.length; this.parserPosition++) {
            const token = this.currentToken()
            // console.log(token)
            if (Constants.IgnoredTypes.includes(token.type)) {
                continue
            // }
            } else {
                // filteredTokens.push(token)
                if (Constants.AccessLevels.includes(token.value)) {
                    filteredTokens.push(token)
                    this.incrementPosition()
                    const obj = this.parseObject()

                    console.log(obj.name ?? "no-name")
                    filteredTokens.push({
                        type: "Object",
                        value: obj
                    })
                } else {

                }
            }
        }

        return Array.from(filteredTokens)
    }

    private parseObject(): ParserObject  {
        
        this.ffWhiteSpace()
        const obj = new ParserObject()
    
        let currentToken = this.currentToken()
        if (currentToken.type == Constants.IdentifierType) {
            obj.name = currentToken.value
            this.incrementPosition()
        } else {
            throw new Error("Syntax error: expecting object name")
        }
    
        currentToken = this.ffWhiteSpace()
        if (currentToken.value == Constants.TypeDefinitionDelimeter) {
            this.incrementPosition()
            currentToken = this.ffWhiteSpace()

            obj.type = currentToken.value
            
            this.incrementPosition()
    
            let children = this.parseObjectBody()
            obj.children.push(...children)
        }
        
        return obj
    }

    private parseObjectBody(): ParserObjectChild[] {

        this.ffWhiteSpace()
        let children: ParserObjectChild[] = []
        
        let currentToken = this.currentToken()
        if (currentToken.value != Constants.ObjectDelimeter.start) {
            throw new Error("Syntax error: expecting object starting delimeter")
        }

        currentToken = this.incrementPosition()
        while (currentToken.value != Constants.ObjectDelimeter.end) {
            currentToken = this.ffWhiteSpace()
            
            if (currentToken.type != Constants.IdentifierType) {
                console.log(currentToken.type, currentToken.value)
                throw new Error("Syntax error: expecting object child name")
            }
    
            let name = currentToken.value
            
            this.incrementPosition()
            currentToken = this.ffWhiteSpace()
            if (currentToken.value != Constants.AssignmentToken) {
                console.log(currentToken, this.parserPosition)
                throw new Error("Syntax error: expecting object child assignment")
            }
        
            this.incrementPosition()
            this.ffWhiteSpace()
    
            let parsedValue = this.parseObjectChildValue()
    
            children.push({
                name: name,
                value: parsedValue
            })
            
            currentToken = this.currentToken()
        }
        
        return children
    }

    private parseObjectChildValue(): ParserChildValue {
        let currentToken = this.currentToken()
        if (currentToken.value == Constants.GuidToken) {
            // parse guid
            let guidStr = currentToken.value

            currentToken = this.incrementPosition()
            if (currentToken.value != Constants.GuidTokenColon) {
                throw new Error("Syntax error: malformed guid, needs colon")
            }
            guidStr += currentToken.value
            
            currentToken = this.incrementPosition()
            if (currentToken.value != Constants.GuidDelimeter.start) {
                console.log(currentToken.value)
                throw new Error("Syntax error: guid expected guid delimiter start")
            }
            guidStr += currentToken.value

            currentToken = this.incrementPosition()
            while (currentToken.value != Constants.GuidDelimeter.end) {
                guidStr += currentToken.value
                currentToken = this.incrementPosition()
            }
    
            currentToken = this.currentToken()
            guidStr += currentToken.value
            this.incrementPosition()
    
            console.log("GUID ", guidStr)
            return guidStr as ParserGuid
        } else if (currentToken.type == Constants.StringLiteralType) {
            const value = currentToken.value
            this.incrementPosition()
            return value as ParserStringLiteral
        } else if (currentToken.value == "~") {
            let value = ""
    
            while (currentToken.type != Constants.LineTerminatorSequence) {
                value += currentToken.value
                currentToken = this.incrementPosition()
            }
            console.log("Tilde case end", value)
            return value as ParserStringLiteral
        } else {
            console.log('array')
            let arrayValue = ""
            arrayValue += currentToken.value
            let stack = [currentToken.value]

            currentToken = this.incrementPosition()
            while (stack.length > 0) {
                arrayValue += currentToken.value
                
                switch (currentToken.value) {
                    case Constants.ArrayDelimeter.start:
                        stack.push(currentToken.value)
                        break
                    case Constants.ArrayDelimeter.end:
                        stack.pop()
                        break
                    }
                    
                currentToken = this.incrementPosition()
            }
            
            this.incrementPosition()
            console.log("array", arrayValue)
    
            return arrayValue as ParserGuid
        }
    }

    private ffWhiteSpace() {
        while (Constants.IgnoredTypes.includes(this.currentToken().type) && this.parserPosition < this.tokens.length) {
            this.parserPosition++
        }

        return this.currentToken()
    }

    private currentToken() {
        return this.tokens[this.parserPosition]
    }

    private incrementPosition() {
        this.parserPosition++
        return this.currentToken()
    }
}
