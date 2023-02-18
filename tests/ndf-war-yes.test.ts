import { readFileSync } from 'fs'
import { NdfParser } from '../src/NdfParser'
const glob = require('glob')

describe('parse common ndfs', () => {
    // grab all ndf files
    const files: string[] = glob.sync('./test-data/war-yes/**/*.ndf', {})

    describe.each(
        files
    )('test ndf file: %s', (file) => {
        test('parse war-yes ndf file', () => {
            try {
                const fileData = readFileSync(file, 'utf8')
                const parser = new NdfParser(fileData)
                const results = parser.parse()

                expect(results.length).toBe(2)
            } catch (err) {
                console.log('Failed to parse ', file)
                expect(err).toBeNull()
            }
        })
    })
})
