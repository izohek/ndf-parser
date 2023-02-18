"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const NdfParser_1 = require("../src/NdfParser");
var glob = require('glob');
describe('parse game patch ndfs', () => {
    // grab all ndf files
    let files = glob.sync('./test-data/patches/**/*.ndf', {});
    describe.each(files)('test ndf file: %s', (file) => {
        test('parse patch ndf file', () => {
            try {
                const fileData = (0, fs_1.readFileSync)(file, 'utf8');
                const parser = new NdfParser_1.NdfParser(fileData);
                const results = parser.parse();
                expect(results.length).toBe(2);
            }
            catch (err) {
                expect(err).toBeNull();
            }
        });
    });
});
