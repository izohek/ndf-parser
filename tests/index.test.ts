import { readFileSync, readdirSync } from 'fs'
import { NdfParser } from '../src/NdfParser'

test('tokenizer-testing', () => {
    let fileData = ''
    try {
        fileData = readFileSync('./test-data/Packs.ndf', 'utf8')
    } catch (err) {
        console.log(err)
    }

    const parser = new NdfParser(fileData)
    const results = parser.parse()

    expect(results.length).toBe(2)
})

/**
 * Test all ndf files in ./test-data folder
 */
test('parse-common-ndfs', () => {
    let files = readdirSync('./test-data')
        .filter((f) => f.endsWith('.ndf')) // only test .ndf files;

    for (const file of files) {
        try {
            const fileData = readFileSync('./test-data/' + file, 'utf8')
            const parser = new NdfParser(fileData)
            const results = parser.parse()
            
            expect(results.length).toBe(2)
        } catch (err) {
            console.log("Failed to parse ", file)
            expect(err).toBeNull()
        }
    }
})