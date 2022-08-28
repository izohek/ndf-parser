"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const fs_1 = require("fs");
test('tokenizer-testing', () => {
    let fileData = "";
    try {
        fileData = (0, fs_1.readFileSync)('./test-data/Packs.ndf', 'utf8');
    }
    catch (err) {
        console.log(err);
    }
    const tokens = (0, index_1.tokenize)(fileData);
});
