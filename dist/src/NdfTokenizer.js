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
exports.NdfTokenizer = void 0;
const js_tokens_1 = __importDefault(require("js-tokens"));
const types_1 = require("./types");
const Constants = __importStar(require("./constants"));
/**
 * Converts an NDF string into a set of logical tokens.
 */
class NdfTokenizer {
    /**
     * Tokenize an ndf file into understandable, logical tokens.
     *
     * Logical tokens, not syntax tokens.
     *
     * @param str
     * @returns
     */
    tokenize(str) {
        let tokens = Array.from((0, js_tokens_1.default)(str));
        return this.parseTokens(tokens);
    }
    /**
     * Parse a set of logical tokens from a set of syntax tokens from an
     * ndf file.
     *
     * @param tokens
     * @returns parser results array
     */
    parseTokens(tokens) {
        var _a;
        const filteredTokens = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (Constants.IgnoredTypes.includes(token.type)) {
                continue;
            }
            else {
                // filteredTokens.push(token)
                if (Constants.AccessLevels.includes(token.value)) {
                    filteredTokens.push(token);
                    const obj = this.parseObject(tokens, i + 1);
                    i = obj[1];
                    console.log((_a = obj[0].name) !== null && _a !== void 0 ? _a : "no-name");
                    filteredTokens.push({
                        type: "Object",
                        value: obj[0]
                    });
                }
                else {
                }
            }
        }
        return Array.from(filteredTokens);
    }
    /**
     * Parse NDF object
     *
     * @param tokens
     * @param position
     * @returns [parsed object, new parser position]
     */
    parseObject(tokens, position) {
        let currentPos = this.ffWhiteSpace(tokens, position);
        const obj = new types_1.ParserObject();
        if (tokens[currentPos].type == Constants.IdentifierType) {
            obj.name = tokens[currentPos].value;
            currentPos += 1;
        }
        else {
            throw new Error("Syntax error: expecting object name");
        }
        currentPos = this.ffWhiteSpace(tokens, currentPos);
        if (tokens[currentPos].value == Constants.TypeDefinitionDelimeter) {
            currentPos += 1;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            obj.type = tokens[currentPos].value;
            currentPos += 1;
            let [children, index] = this.parseObjectBody(tokens, currentPos);
            obj.children.push(...children);
            currentPos = index;
        }
        else if (tokens[currentPos].value == Constants.ObjectDelimeter.start) {
            let [children, index] = this.parseObjectBody(tokens, currentPos);
            obj.children.push(...children);
            currentPos = index;
        }
        return [obj, currentPos];
    }
    /**
     * Parse the body of an NDF object
     *
     * @param tokens
     * @param position
     * @returns [object attributes, new parser position]
     */
    parseObjectBody(tokens, position) {
        let currentPos = this.ffWhiteSpace(tokens, position);
        let children = [];
        if (tokens[currentPos].value != Constants.ObjectDelimeter.start) {
            throw new Error("Syntax error: expecting object starting delimeter");
        }
        currentPos += 1;
        currentPos = this.ffWhiteSpace(tokens, currentPos);
        while (tokens[currentPos].value != Constants.ObjectDelimeter.end) {
            console.log(tokens[currentPos].value);
            if (tokens[currentPos].type != Constants.IdentifierType) {
                console.log(tokens[currentPos].type, tokens[currentPos].value, currentPos);
                throw new Error("Syntax error: expecting object child name");
            }
            let name = tokens[currentPos].value;
            currentPos += 1;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            if (tokens[currentPos].value != Constants.AssignmentToken) {
                console.log(tokens[currentPos], currentPos);
                throw new Error("Syntax error: expecting object child assignment");
            }
            currentPos += 1;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            let [parsedValue, index] = this.parseObjectChildValue(tokens, currentPos);
            children.push({
                name: name,
                value: parsedValue
            });
            currentPos = index;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
        }
        return [children, currentPos];
    }
    /**
     * Parse attribute definitions found in the body of an object
     *
     * @param tokens
     * @param position
     * @returns [parser results, new parser position]
     */
    parseObjectChildValue(tokens, position) {
        if (tokens[position].value == Constants.GuidToken) {
            // parse guid
            let guidStr = tokens[position].value;
            let currentPos = position + 1;
            if (tokens[currentPos].value != Constants.GuidTokenColon) {
                throw new Error("Syntax error: malformed guid, needs colon");
            }
            guidStr += tokens[currentPos].value;
            currentPos += 1;
            if (tokens[currentPos].value != Constants.GuidDelimeter.start) {
                console.log(tokens[currentPos].value);
                throw new Error("Syntax error: guid expected guid delimiter start");
            }
            guidStr += tokens[currentPos].value;
            currentPos += 1;
            while (tokens[currentPos].value != Constants.GuidDelimeter.end) {
                guidStr += tokens[currentPos].value;
                currentPos += 1;
            }
            guidStr += tokens[currentPos].value;
            currentPos += 1;
            return [
                guidStr,
                currentPos
            ];
        }
        else if (tokens[position].type == Constants.StringLiteralType) {
            const value = tokens[position].value;
            return [
                value,
                position + 1
            ];
        }
        else if (tokens[position].type == Constants.NumberLiteralType) {
            const value = tokens[position].value;
            return [
                value,
                position + 1
            ];
        }
        else if (tokens[position].value == Constants.TildeToken) {
            let [value, currentPos] = this.parseTildeValue(tokens, position);
            return [
                value,
                currentPos
            ];
        }
        else {
            let arrayValue = "";
            arrayValue += tokens[position].value;
            let stack = [tokens[position].value];
            let currentPos = position + 1;
            while (stack.length > 0) {
                arrayValue += tokens[currentPos].value;
                switch (tokens[currentPos].value) {
                    case Constants.ArrayDelimeter.start:
                        stack.push(tokens[currentPos].value);
                        break;
                    case Constants.ArrayDelimeter.end:
                        stack.pop();
                        break;
                }
                currentPos += 1;
            }
            currentPos += 1;
            return [
                this.parseArray(arrayValue),
                currentPos
            ];
        }
    }
    /**
     * Parse an NDF Array
     *
     * This method supports arrays with included values of Objects or Tilde string/path
     * values.
     *
     * @param arrayString
     * @returns ParserArray
     */
    parseArray(arrayString) {
        let outArray = new types_1.ParserArray();
        //
        // Setup and sanity checks
        //
        // Remove white space and other ignored tokens
        let arrayTokens = Array.from((0, js_tokens_1.default)(arrayString));
        // Make sure we have data
        if (arrayTokens.length < 1) {
            return outArray;
        }
        let stack = []; // delimiter stack
        let index = 0; // parser position
        // Syntax should start with array delimiter start => [
        if (arrayTokens[index].value == Constants.ArrayDelimeter.start) {
            stack.push(arrayTokens[index].value);
            index++;
        }
        else {
            throw new Error("Expecting array start delimiter as first token.");
        }
        //
        // Parse tokens representing array
        //
        // parse loop
        for (let i = 0; i < arrayTokens.length; i++) {
            // Skip whitespace
            i = this.ffWhiteSpace(arrayTokens, i);
            const token = arrayTokens[i];
            // Check for empty array
            if (token.value == Constants.ArrayDelimeter.end) {
                stack.pop();
                break;
            }
            switch (token.type) {
                // Parse: Object
                case Constants.IdentifierType:
                    let [object, newIndex] = this.parseObject(arrayTokens, i);
                    console.log(object);
                    outArray.values.push(object);
                    i = newIndex;
                    break;
                // Parse: Path/tilde leading value
                case Constants.PunctuatorType:
                    if (token.value == Constants.TildeToken) {
                        let [tildeValue, position] = this.parseTildeValue(arrayTokens, i);
                        outArray.values.push(tildeValue);
                        i = position;
                        break;
                    }
                default:
                    break;
            }
        }
        if (stack.length > 0) {
            throw new Error("Missing array delimiter end character");
        }
        return outArray;
    }
    /**
     * Parse a value in the form of : "~:str:" where ":str:" is an arbitrary string.
     * Values with trailing commas will have their trailing comma trimmed.
     *
     * @param tokens
     * @param position
     * @returns [parsed value, new parser position]
     */
    parseTildeValue(tokens, position) {
        let currentPos = position;
        let value = "";
        while (tokens[currentPos].type != Constants.LineTerminatorSequence) {
            value += tokens[currentPos].value;
            currentPos += 1;
        }
        if (value.endsWith(Constants.CommaToken)) {
            value = value.slice(0, -1);
        }
        return [value, currentPos];
    }
    /**
     * Fast forward parser through ignored types including white space and comments.
     *
     * See Constants.IgnoredTypes
     *
     * @param tokens
     * @param position
     * @returns new parser position
     */
    ffWhiteSpace(tokens, position) {
        let currentPos = position;
        while (Constants.IgnoredTypes.includes(tokens[currentPos].type) && currentPos < tokens.length) {
            currentPos += 1;
        }
        return currentPos;
    }
}
exports.NdfTokenizer = NdfTokenizer;
