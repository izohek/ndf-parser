import { lex } from "../src/lex/lexer"
import expected from "../test-data/ndf-manual/expected"

describe('lex ndf manual files', () => {
    const fs = require('fs')
    const path = require('path')
    const dir = path.join(__dirname, '../test-data/ndf-manual')
    const files = fs.readdirSync(dir)
    
    files.forEach((file: any) => {
        if (!file.endsWith('ndf')) {
            return;
        }
        
        test(file, () => {
            const filePath = path.join(dir, file)
            const content = fs.readFileSync(filePath, 'utf8')
            const lexResult = lex(content)
            expect(lexResult.length).toBeGreaterThan(0)

            const expectedTokens = expected[file]
            expect(lexResult.length).toEqual(expectedTokens.length)

            for (let i = 0; i < lexResult.length; i++) {
                const actual = lexResult[i]
                const expected = expectedTokens[i]
                expect(actual.type).toEqual(expected.type)
                expect(actual.value).toEqual(expected.value)
            }
        })
    })
}
)
