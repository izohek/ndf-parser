export abstract class NdfSyntaxElement {
    constructor(
        public value: string
    ) {}
}

export class Keyword extends NdfSyntaxElement {}
export class Symbol extends NdfSyntaxElement {}
export class BlockDelimeter extends NdfSyntaxElement {
    // delimeter start and end characters
    protected characters: string[]

    constructor(
        public value: string
    ) {
        super(value)
        this.characters = value.split(' ').slice(0,2)
    }

    public start() {
        return this.characters[0]
    }
    
    public end() {
        return this.characters[1]
    }
}

export const Keywords: Keyword[] = [
    'export', 
    'is',
    'template',
    'unnamed',
    'nil',
    'private',
    'int',
    'string',
    'true',
    'false',
    'div',
    'map'
].map(k => new Keyword(k))

export const Symbols = [
    '//',
    '/',
    '?',
    ':',
    '=',
    '|',
    '&',
    '<',
    '>',
    '>=',
    '<=',
    '!=',
    '-',
    '+',
    '*',
    '%',
    ',',
    '.',
    '(',
    ')',
    '[',
    ']',
    '{',
    '}',
    '<',
    '>',
    '*',
    
]
.sort( (a,b) => a.length - b.length )
.map( s => new Symbol(s))

export const BlockDelimeters = [
    '{ }',
    '[ ]',
    '( )',
    '< >',
    '(* *)',
    '/* */',
    '\' \'',
    '" "'
]
.map(delimeter => new BlockDelimeter(delimeter))

export const Whitespace = new Symbol(' ')
export const NewLine = new Symbol('\n')

export const Syntax = {
    keyword: Keywords,
    symbol: Symbols,
    block: BlockDelimeters,
    whitespace: Whitespace,
    newLine: NewLine
}
