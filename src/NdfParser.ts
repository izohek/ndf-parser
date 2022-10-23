import { NdfToken, NdfAttribute, NdfConstant, NdfObject } from './types'
import * as Constants from './constants'
import { NdfTokenizer, TokenType } from './NdfTokenizer'

export class NdfParser {
    public data: string

    /// Enable debug mode for console logging.
    public debug: boolean = false

    constructor (data: string) {
        this.data = data
    }

    public parse (): [TokenType[], Array<NdfObject | NdfConstant>] {
        const tokenizer = new NdfTokenizer()
        tokenizer.debug = this.debug
        const tokens = tokenizer.tokenize(this.data)
        return [tokens, this.decipherTokens(tokens)]
    }

    public decipherTokens (tokens: TokenType[]): Array<NdfObject | NdfConstant> {
        const deciphered = []

        let accessLevel = ''
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
                        accessLevel,
                        attributes: [],
                        ndf: 'object-parser'
                    }

                    accessLevel = ''

                    object.attributes = this.decipherAttributes(token.value.children)

                    deciphered.push(object)

                    break

                case Constants.ConstantToken:
                    object = {
                        name: token.value.name,
                        type: Constants.ConstantToken,
                        value: token.value.children[0].value,
                        ndf: 'constant'
                    }

                    deciphered.push(object)

                    break

                default:
                    break
            }
        }

        return deciphered
    }

    public decipherAttributes (tokens: [{name: string, value: any}]): NdfAttribute[] {
        if (tokens.length < 1) {
            return []
        }

        const attributes: NdfAttribute[] = []

        for (const token of tokens) {
            attributes.push({
                name: token.name,
                value: token.value,
                ndf: 'attribute'
            })
        }

        return attributes
    }
}
