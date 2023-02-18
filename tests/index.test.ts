import { readFileSync } from 'fs'
import { NdfParser } from '../src/NdfParser'

test('tokenizer-testing', () => {
    let fileData = ''
    try {
        fileData = readFileSync('./test-data/war-yes/Packs.ndf', 'utf8')
    } catch (err) {
        console.log(err)
    }

    const parser = new NdfParser(fileData)
    const results = parser.parse()

    expect(results.length).toBe(2)
})
