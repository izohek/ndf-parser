"use strict";
// Parser Types
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserArray = exports.ParserObject = void 0;
/**
 * An NDF object or object instance.
 *
 * Examples:
 *
 * objectname is <type> ( <content> )
 * export objectname is <type> ( <content> )
 * objectname ( <content> )
 */
class ParserObject {
    constructor() {
        this.name = "";
        this.type = "";
        this.children = [];
        this.ndf = 'object';
    }
}
exports.ParserObject = ParserObject;
/**
 * Ndf array entity.
 * Note: Unclear the differences between array and map.
 *
 * Example:
 * `
 * DivisionTags = ['DEFAULT', 'FR', 'Allied', 'infantryReg', 'DC_PWR2']
 * `
 */
class ParserArray {
    constructor() {
        this.values = [];
        this.ndf = 'array';
    }
}
exports.ParserArray = ParserArray;
