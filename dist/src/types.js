"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserArray = exports.ParserObject = void 0;
class ParserObject {
    constructor() {
        this.name = "";
        this.type = "";
        this.children = [];
    }
}
exports.ParserObject = ParserObject;
class ParserArray {
    constructor() {
        this.values = [];
    }
}
exports.ParserArray = ParserArray;
