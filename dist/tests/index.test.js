"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const NdfParser_1 = require("../src/NdfParser");
test('tokenizer-testing', () => {
    let fileData = "";
    try {
        fileData = (0, fs_1.readFileSync)('./test-data/Packs.ndf', 'utf8');
    }
    catch (err) {
        console.log(err);
    }
    const parser = new NdfParser_1.NdfParser(fileData);
    const results = parser.parse();
});
