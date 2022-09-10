import jsTokens from "js-tokens";
import { NdfToken, NdfAttribute, NdfObject, ParserArray, ParserChildValue, ParserGuid, ParserObject, ParserObjectChild, ParserStringLiteral } from "./types"
import * as Constants from "./constants"
import { NdfTokenizer, TokenType } from "./NdfTokenizer";

export class NdfParser {

    public  data: string

    constructor(data: string) {
        this.data = data
    }

    public parse() {
        let tokenizer = new NdfTokenizer()
        let tokens = tokenizer.tokenize(this.data)
        return [tokens, this.decipherTokens(tokens)]
    }

    public decipherTokens(tokens: TokenType[]) {
        let deciphered = []

        let accessLevel = ""
        let object: NdfToken | null = null

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i]

            switch (token.type) {
                case Constants.IdentifierType:
                    accessLevel = Constants.ExportToken
                    break
                
                case Constants.ObjectToken:
                    object = {
                        name: token.value.name,
                        type: token.value.type,
                        accessLevel: accessLevel,
                        attributes: []
                    }

                    accessLevel = ""

                    object.attributes = this.decipherAttributes(token.value.children)

                    deciphered.push(object)

                    break
                
                case Constants.ConstantToken:
                    object = {
                        name: token.value.name,
                        type: Constants.ConstantToken,
                        value: token.value.children[0].value
                    }

                    deciphered.push(object)

                    break
                
                default:
                    break
            }
        }

        return deciphered
    }

    public decipherAttributes(tokens: [{name: string, value: any}]) {
        if ( tokens.length < 1 ) {
            return []
        }

        let attributes: NdfAttribute[] = []

        for(let token of tokens) {
            attributes.push({
                name: token.name,
                value: token.value
            })
        }

        return attributes
    }
}
