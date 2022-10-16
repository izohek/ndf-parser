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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupTokens2 = exports.groupTokens = exports.tokenize = exports.parseNdf = exports.NdfParser = void 0;
const js_tokens_1 = __importDefault(require("js-tokens"));
const types_1 = require("./types");
const Constants = __importStar(require("./constants"));
var NdfParser_1 = require("./NdfParser");
Object.defineProperty(exports, "NdfParser", { enumerable: true, get: function () { return NdfParser_1.NdfParser; } });
__exportStar(require("./ParseInspector"), exports);
function parseNdf(str) {
    const tokens = tokenize(str);
    const grouped = groupTokens(tokens);
    return grouped;
}
exports.parseNdf = parseNdf;
function tokenize(str) {
    return Array.from((0, js_tokens_1.default)(str));
}
exports.tokenize = tokenize;
function groupTokens(tokens) {
    var _a;
    const filteredTokens = [];
    const stack = [];
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        // console.log(token)
        if (Constants.IgnoredTypes.includes(token.type)) {
            continue;
            // }
        }
        else {
            // filteredTokens.push(token)
            if (Constants.AccessLevels.includes(token.value)) {
                filteredTokens.push(token);
                const obj = parseObject(tokens, i + 1);
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
exports.groupTokens = groupTokens;
function parseObject(tokens, position) {
    let currentPos = ffWhiteSpace(tokens, position);
    const obj = new types_1.ParserObject();
    if (tokens[currentPos].type == Constants.IdentifierType) {
        obj.name = tokens[currentPos].value;
        currentPos += 1;
    }
    else {
        throw new Error("Syntax error: expecting object name");
    }
    currentPos = ffWhiteSpace(tokens, currentPos);
    if (tokens[currentPos].value == Constants.TypeDefinitionDelimeter) {
        currentPos += 1;
        currentPos = ffWhiteSpace(tokens, currentPos);
        obj.type = tokens[currentPos].value;
        currentPos += 1;
        let [children, index] = parseObjectBody(tokens, currentPos);
        obj.children.push(...children);
        currentPos = index;
    }
    return [obj, currentPos];
}
function parseObjectBody(tokens, position) {
    let currentPos = ffWhiteSpace(tokens, position);
    let children = [];
    if (tokens[currentPos].value != Constants.ObjectDelimeter.start) {
        throw new Error("Syntax error: expecting object starting delimeter");
    }
    currentPos += 1;
    while (tokens[currentPos].value != Constants.ObjectDelimeter.end) {
        currentPos = ffWhiteSpace(tokens, currentPos);
        if (tokens[currentPos].type != Constants.IdentifierType) {
            console.log(tokens[currentPos].type, tokens[currentPos].value);
            throw new Error("Syntax error: expecting object child name");
        }
        let name = tokens[currentPos].value;
        currentPos += 1;
        currentPos = ffWhiteSpace(tokens, currentPos);
        if (tokens[currentPos].value != Constants.AssignmentToken) {
            console.log(tokens[currentPos], currentPos);
            throw new Error("Syntax error: expecting object child assignment");
        }
        currentPos += 1;
        currentPos = ffWhiteSpace(tokens, currentPos);
        let [parsedValue, index] = parseObjectChildValue(tokens, currentPos);
        children.push({
            name: name,
            value: parsedValue
        });
        currentPos = index;
    }
    return [children, currentPos];
}
function parseObjectChildValue(tokens, position) {
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
        console.log("GUID ", guidStr);
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
    else if (tokens[position].value == "~") {
        let currentPos = position;
        let value = "";
        while (tokens[currentPos].type != Constants.LineTerminatorSequence) {
            value += tokens[currentPos].value;
            currentPos += 1;
        }
        console.log("Tilde case end", value);
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
        console.log("array", arrayValue);
        return [
            arrayValue,
            currentPos
        ];
    }
}
function ffWhiteSpace(tokens, position) {
    let currentPos = position;
    while (Constants.IgnoredTypes.includes(tokens[currentPos].type) && currentPos < tokens.length) {
        currentPos += 1;
    }
    return currentPos;
}
function groupTokens2(tokens) {
    const filteredTokens = [];
    const stack = [];
    let exportObj = null;
    for (const token of tokens) {
        if (Constants.IgnoredTypes.includes(token.type)) {
            continue;
        }
        else {
            filteredTokens.push(token);
        }
        let lastElement = null;
        if (stack.length > 0) {
            lastElement = stack[stack.length - 1];
        }
        if (lastElement === null) {
            console.log("null");
        }
        else if (lastElement instanceof types_1.ParserArray) {
            console.log("array");
        }
        else if (lastElement instanceof types_1.ParserObject) {
            console.log("obj");
        }
        switch (token.value) {
            case Constants.ExportToken:
                console.log("Export token");
                exportObj = new types_1.ParserObject();
                break;
            case Constants.ObjectDelimeter.start:
                console.log("Object start");
                stack.push(new types_1.ParserObject());
                break;
            case Constants.ObjectDelimeter.end:
                console.log("Object end");
                if (lastElement instanceof types_1.ParserObject) {
                    const obj = stack.pop();
                    console.log("Finished obj", obj);
                }
                else {
                    throw new Error("Syntax error - expected closing object delimiter");
                }
                break;
            case Constants.ArrayDelimeter.start:
                console.log("Array start");
                stack.push(new types_1.ParserArray());
                break;
            case Constants.ArrayDelimeter.end:
                console.log("Array end");
                if (lastElement instanceof types_1.ParserArray) {
                    const arr = stack.pop();
                    console.log("Finished array", arr);
                }
                else {
                    throw new Error("Syntax error - expected closing array delimiter");
                }
                break;
        }
    }
    return Array.from(filteredTokens);
}
exports.groupTokens2 = groupTokens2;
