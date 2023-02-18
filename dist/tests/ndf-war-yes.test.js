"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const NdfParser_1 = require("../src/NdfParser");
var glob = require('glob');
describe('parse common ndfs', () => {
    // grab all ndf files
    let files = glob.sync('./test-data/war-yes/**/*.ndf', {});
    describe.each(files)('test ndf file: %s', (file) => {
        test('parse war-yes ndf file', () => {
            try {
                const fileData = (0, fs_1.readFileSync)(file, 'utf8');
                const parser = new NdfParser_1.NdfParser(fileData);
                const results = parser.parse();
                expect(results.length).toBe(2);
            }
            catch (err) {
                console.log('Failed to parse ', file);
                expect(err).toBeNull();
            }
        });
    });
});
