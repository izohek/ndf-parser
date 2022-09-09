"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NdfParser = void 0;
const Constants = __importStar(require("./constants"));
const NdfTokenizer_1 = require("./NdfTokenizer");
class NdfParser {
    constructor(data) {
        this.data = data;
    }
    parse() {
        let tokenizer = new NdfTokenizer_1.NdfTokenizer();
        let tokens = tokenizer.tokenize(this.data);
        return [tokens, this.decipherTokens(tokens)];
    }
    decipherTokens(tokens) {
        let deciphered = [];
        let accessLevel = "";
        let object = null;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            switch (token.type) {
                case Constants.IdentifierType:
                    accessLevel = Constants.ExportToken;
                    break;
                case Constants.ObjectToken:
                    object = {
                        name: token.value.name,
                        type: token.value.type,
                        accessLevel: accessLevel,
                        attributes: []
                    };
                    accessLevel = "";
                    object.attributes = this.decipherAttributes(token.value.children);
                    deciphered.push(object);
                    break;
                default:
                    break;
            }
        }
        return deciphered;
    }
    decipherAttributes(tokens) {
        if (tokens.length < 1) {
            return [];
        }
        let attributes = [];
        for (let token of tokens) {
            attributes.push({
                name: token.name,
                value: token.value
            });
        }
        return attributes;
    }
}
exports.NdfParser = NdfParser;
