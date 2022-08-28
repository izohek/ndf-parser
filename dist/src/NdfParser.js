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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NdfParser = void 0;
const js_tokens_1 = __importDefault(require("js-tokens"));
const types_1 = require("./types");
const Constants = __importStar(require("./constants"));
class NdfParser {
    constructor(data) {
        this.parserPosition = 0;
        this.data = data;
    }
    parse() {
        this.tokens = this.tokenize(this.data);
        return this.parseTokens();
    }
    tokenize(str) {
        return Array.from((0, js_tokens_1.default)(str));
    }
    parseTokens() {
        var _a;
        const filteredTokens = [];
        const stack = [];
        for (this.parserPosition = 0; this.parserPosition < this.tokens.length; this.parserPosition++) {
            const token = this.currentToken();
            // console.log(token)
            if (Constants.IgnoredTypes.includes(token.type)) {
                continue;
                // }
            }
            else {
                // filteredTokens.push(token)
                if (Constants.AccessLevels.includes(token.value)) {
                    filteredTokens.push(token);
                    this.incrementPosition();
                    const obj = this.parseObject();
                    console.log((_a = obj.name) !== null && _a !== void 0 ? _a : "no-name");
                    filteredTokens.push({
                        type: "Object",
                        value: obj
                    });
                }
                else {
                }
            }
        }
        return Array.from(filteredTokens);
    }
    parseObject() {
        this.ffWhiteSpace();
        const obj = new types_1.ParserObject();
        let currentToken = this.currentToken();
        if (currentToken.type == Constants.IdentifierType) {
            obj.name = currentToken.value;
            this.incrementPosition();
        }
        else {
            throw new Error("Syntax error: expecting object name");
        }
        currentToken = this.ffWhiteSpace();
        if (currentToken.value == Constants.TypeDefinitionDelimeter) {
            this.incrementPosition();
            currentToken = this.ffWhiteSpace();
            obj.type = currentToken.value;
            this.incrementPosition();
            let children = this.parseObjectBody();
            obj.children.push(...children);
        }
        return obj;
    }
    parseObjectBody() {
        this.ffWhiteSpace();
        let children = [];
        let currentToken = this.currentToken();
        if (currentToken.value != Constants.ObjectDelimeter.start) {
            throw new Error("Syntax error: expecting object starting delimeter");
        }
        currentToken = this.incrementPosition();
        while (currentToken.value != Constants.ObjectDelimeter.end) {
            currentToken = this.ffWhiteSpace();
            if (currentToken.type != Constants.IdentifierType) {
                console.log(currentToken.type, currentToken.value);
                throw new Error("Syntax error: expecting object child name");
            }
            let name = currentToken.value;
            this.incrementPosition();
            currentToken = this.ffWhiteSpace();
            if (currentToken.value != Constants.AssignmentToken) {
                console.log(currentToken, this.parserPosition);
                throw new Error("Syntax error: expecting object child assignment");
            }
            this.incrementPosition();
            this.ffWhiteSpace();
            let parsedValue = this.parseObjectChildValue();
            children.push({
                name: name,
                value: parsedValue
            });
            currentToken = this.currentToken();
        }
        return children;
    }
    parseObjectChildValue() {
        let currentToken = this.currentToken();
        if (currentToken.value == Constants.GuidToken) {
            // parse guid
            let guidStr = currentToken.value;
            currentToken = this.incrementPosition();
            if (currentToken.value != Constants.GuidTokenColon) {
                throw new Error("Syntax error: malformed guid, needs colon");
            }
            guidStr += currentToken.value;
            currentToken = this.incrementPosition();
            if (currentToken.value != Constants.GuidDelimeter.start) {
                console.log(currentToken.value);
                throw new Error("Syntax error: guid expected guid delimiter start");
            }
            guidStr += currentToken.value;
            currentToken = this.incrementPosition();
            while (currentToken.value != Constants.GuidDelimeter.end) {
                guidStr += currentToken.value;
                currentToken = this.incrementPosition();
            }
            currentToken = this.currentToken();
            guidStr += currentToken.value;
            this.incrementPosition();
            console.log("GUID ", guidStr);
            return guidStr;
        }
        else if (currentToken.type == Constants.StringLiteralType) {
            const value = currentToken.value;
            this.incrementPosition();
            return value;
        }
        else if (currentToken.value == "~") {
            let value = "";
            while (currentToken.type != Constants.LineTerminatorSequence) {
                value += currentToken.value;
                currentToken = this.incrementPosition();
            }
            console.log("Tilde case end", value);
            return value;
        }
        else {
            console.log('array');
            let arrayValue = "";
            arrayValue += currentToken.value;
            let stack = [currentToken.value];
            currentToken = this.incrementPosition();
            while (stack.length > 0) {
                arrayValue += currentToken.value;
                switch (currentToken.value) {
                    case Constants.ArrayDelimeter.start:
                        stack.push(currentToken.value);
                        break;
                    case Constants.ArrayDelimeter.end:
                        stack.pop();
                        break;
                }
                currentToken = this.incrementPosition();
            }
            this.incrementPosition();
            console.log("array", arrayValue);
            return arrayValue;
        }
    }
    ffWhiteSpace() {
        while (Constants.IgnoredTypes.includes(this.currentToken().type) && this.parserPosition < this.tokens.length) {
            this.parserPosition++;
        }
        return this.currentToken();
    }
    currentToken() {
        return this.tokens[this.parserPosition];
    }
    incrementPosition() {
        this.parserPosition++;
        return this.currentToken();
    }
}
exports.NdfParser = NdfParser;
