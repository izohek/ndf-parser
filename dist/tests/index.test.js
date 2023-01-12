"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const NdfParser_1 = require("../src/NdfParser");
test('tokenizer-testing', () => {
    let fileData = '';
    try {
        fileData = (0, fs_1.readFileSync)('./test-data/Packs.ndf', 'utf8');
    }
    catch (err) {
        console.log(err);
    }
    const parser = new NdfParser_1.NdfParser(fileData);
    const results = parser.parse();
    expect(results.length).toBe(2);
});
/**
 * Test all ndf files in ./test-data folder
 */
test('parse-common-ndfs', () => {
    const files = (0, fs_1.readdirSync)('./test-data')
        .filter((f) => f.endsWith('.ndf')); // only test .ndf files;
    for (const file of files) {
        try {
            const fileData = (0, fs_1.readFileSync)('./test-data/' + file, 'utf8');
            const parser = new NdfParser_1.NdfParser(fileData);
            const results = parser.parse();
            expect(results.length).toBe(2);
        }
        catch (err) {
            console.log('Failed to parse ', file);
            expect(err).toBeNull();
        }
    }
});
