import { readFileSync } from 'fs'
import { NdfParser } from '../src/NdfParser'
var glob = require('glob');

describe('parse game patch ndfs', () => {
    // grab all ndf files
    let files: string[] = glob.sync('./test-data/patches/**/*.ndf', {})

    describe.each(
        files
    )('test ndf file: %s', (file) => {
        test('parse patch ndf file', () => {
            try {
                const fileData = readFileSync(file, 'utf8')
                const parser = new NdfParser(fileData)
                const results = parser.parse()
    
                expect(results.length).toBe(2)
            } catch (err) {
                expect(err).toBeNull()
            }
        })
    })
})
