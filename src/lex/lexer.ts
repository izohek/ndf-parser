import { Keywords, Symbols, BlockDelimeters } from "./syntax"

export interface Token {
    type: string,
    value: any
}

export function lex(value: string) {
    const tokens: Token[] = []
    let i = 0
    while (i < value.length) {
        let token = lexToken(value, i)
        if (token) {
            tokens.push(token)
            i += token.value.length
        } else {
            i++
        }
    }
    return tokens
}

export function lexToken(value: string, i: number): Token | undefined {
    return lexComment(value, i) ||
        lexKeyword(value, i) ||
        lexString(value, i) ||
        lexNumber(value, i) ||
        lexSymbol(value, i) ||
        lexIdentifier(value, i) ||
        lexNewline(value, i)
}

export function lexComment(value: string, i: number): Token | undefined {
    if (value[i] === '/' && value[i+1] === '/') {
        let j = i + 2
        while (j < value.length && value[j] !== '\n') {
            j++
        }
        return {
            type: 'comment',
            value: value.substring(i, j)
        }
    }

    // check for /* */
    if (value[i] === '/' && value[i+1] === '*') {
        let j = i + 2
        while (j < value.length && !(value[j] === '*' && value[j+1] === '/')) {
            j++
        }
        return {
            type: 'comment',
            value: value.substring(i, j+2)
        }
    }

    return undefined
}

export function lexKeyword(value: string, i: number): Token | undefined {
    // lex keywords using Keywords from syntax.ts
    for (let keyword of Keywords) {
        const compare = value.slice(i, i + keyword.value.length)
        if (compare.localeCompare(keyword.value, "en", { sensitivity: "base" }) === 0) {
            return {
                type: 'keyword',
                value: compare
            }
        }
    }
    return undefined
}

export function lexSymbol(value: string, i: number): Token | undefined {
    // lex symbols using Symbols from syntax.ts
    for (let symbol of Symbols) {
        if (value.startsWith(symbol.value, i)) {
            return {
                type: 'symbol',
                value: symbol.value
            }
        }
    }
    return undefined
}

export function lexString(value: string, i: number): Token | undefined {
    // strings can be surrounded by " or '
    if (value[i] === '"' || value[i] === "'") {
        let j = i + 1
        while (j < value.length && value[j] !== value[i]) {
            j++
        }
        return {
            type: 'string',
            value: value.substring(i, j+1)
        }
    }
    return undefined
}

export function lexNumber(value: string, i: number): Token | undefined {
    // numbers can be integers or floats.  check for period to determine if float.
    // numbers can be negative, so check for - sign
    let j = i

    if (value[j] === '-') {
        j++
    }

    while (j < value.length && isDigit(value[j])) {
        j++
    }
    
    if (j > i && value[j] === '.') {
        j++
        while (j < value.length && isDigit(value[j])) {
            j++
        }
    }
    // console.log('--')
    if (j > i) {
        return {
            type: 'number',
            value: value.substring(i, j)
        }
    }
    return undefined
}

export function lexIdentifier(value: string, i: number): Token | undefined {
    // identifiers can be any sequence of characters that doesn't start with a digit
    let j = i
    while (j < value.length && isIdentifierCharacter(value[j])) {
        j++
    }
    if (j > i) {
        return {
            type: 'identifier',
            value: value.substring(i, j)
        }
    }
    return undefined
}

export function isDigit(c: string) {
    return c >= '0' && c <= '9'
}

export function isIdentifierCharacter(c: string) {
    return (c >= 'a' && c <= 'z') ||
        (c >= 'A' && c <= 'Z') ||
        (c >= '0' && c <= '9') ||
        c === '_' || c === '$' || c === '~'
}

export function isWhitespace(c: string) {
    return c === ' ' || c === '\t' || c === '\n' || c === '\r'
}

export function isBlockDelimeter(c: string) {
    for (let delimeter of BlockDelimeters) {
        if (delimeter.start() === c || delimeter.end() === c) {
            return true
        }
    }
    return false
}

export function lexNewline(value: string, i: number): Token | undefined {
    if (value[i] === '\n') {
        return {
            type: 'newline',
            value: '\n'
        }
    }
    return undefined
}
