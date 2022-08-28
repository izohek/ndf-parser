"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupTokens2 = exports.groupTokens = exports.tokenize = exports.parseNdf = exports.StringLiteralType = exports.ExportToken = exports.GuidTokenColon = exports.GuidToken = exports.ArrayDelimeter = exports.ObjectDelimeter = exports.GuidDelimeter = exports.TypeDefinitionDelimeter = exports.AccessLevels = exports.ValueTypes = exports.AssignmentToken = exports.IdentifierType = exports.IgnoredTypes = exports.LineTerminatorSequence = exports.token = void 0;
const js_tokens_1 = __importDefault(require("js-tokens"));
const types_1 = require("./types");
exports.token = Array.from((0, js_tokens_1.default)("hello, !world"));
exports.LineTerminatorSequence = "LineTerminatorSequence";
exports.IgnoredTypes = [
    exports.LineTerminatorSequence,
    "WhiteSpace",
    "SingleLineComment"
];
exports.IdentifierType = "IdentifierName";
exports.AssignmentToken = '=';
exports.ValueTypes = [
    exports.IdentifierType,
    "NumericLiteral",
    ""
];
exports.AccessLevels = [
    "export",
    "private"
];
exports.TypeDefinitionDelimeter = "is";
exports.GuidDelimeter = {
    start: "{",
    end: "}"
};
exports.ObjectDelimeter = {
    start: "(",
    end: ")"
};
exports.ArrayDelimeter = {
    start: "[",
    end: "]"
};
exports.GuidToken = "GUID";
exports.GuidTokenColon = ":";
exports.ExportToken = "export";
exports.StringLiteralType = "StringLiteral";
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
        if (exports.IgnoredTypes.includes(token.type)) {
            continue;
            // }
        }
        else {
            // filteredTokens.push(token)
            if (exports.AccessLevels.includes(token.value)) {
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
    if (tokens[currentPos].type == exports.IdentifierType) {
        obj.name = tokens[currentPos].value;
        currentPos += 1;
    }
    else {
        throw new Error("Syntax error: expecting object name");
    }
    currentPos = ffWhiteSpace(tokens, currentPos);
    if (tokens[currentPos].value == exports.TypeDefinitionDelimeter) {
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
    if (tokens[currentPos].value != exports.ObjectDelimeter.start) {
        throw new Error("Syntax error: expecting object starting delimeter");
    }
    currentPos += 1;
    while (tokens[currentPos].value != exports.ObjectDelimeter.end) {
        currentPos = ffWhiteSpace(tokens, currentPos);
        if (tokens[currentPos].type != exports.IdentifierType) {
            console.log(tokens[currentPos].type, tokens[currentPos].value);
            throw new Error("Syntax error: expecting object child name");
        }
        let name = tokens[currentPos].value;
        currentPos += 1;
        currentPos = ffWhiteSpace(tokens, currentPos);
        if (tokens[currentPos].value != exports.AssignmentToken) {
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
    if (tokens[position].value == exports.GuidToken) {
        // parse guid
        let guidStr = tokens[position].value;
        let currentPos = position + 1;
        if (tokens[currentPos].value != exports.GuidTokenColon) {
            throw new Error("Syntax error: malformed guid, needs colon");
        }
        guidStr += tokens[currentPos].value;
        currentPos += 1;
        if (tokens[currentPos].value != exports.GuidDelimeter.start) {
            console.log(tokens[currentPos].value);
            throw new Error("Syntax error: guid expected guid delimiter start");
        }
        guidStr += tokens[currentPos].value;
        currentPos += 1;
        while (tokens[currentPos].value != exports.GuidDelimeter.end) {
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
    else if (tokens[position].type == exports.StringLiteralType) {
        const value = tokens[position].value;
        return [
            value,
            position + 1
        ];
    }
    else if (tokens[position].value == "~") {
        let currentPos = position;
        let value = "";
        while (tokens[currentPos].type != exports.LineTerminatorSequence) {
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
                case exports.ArrayDelimeter.start:
                    stack.push(tokens[currentPos].value);
                    break;
                case exports.ArrayDelimeter.end:
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
    while (exports.IgnoredTypes.includes(tokens[currentPos].type) && currentPos < tokens.length) {
        currentPos += 1;
    }
    return currentPos;
}
function groupTokens2(tokens) {
    const filteredTokens = [];
    const stack = [];
    let exportObj = null;
    for (const token of tokens) {
        if (exports.IgnoredTypes.includes(token.type)) {
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
            case exports.ExportToken:
                console.log("Export token");
                exportObj = new types_1.ParserObject();
                break;
            case exports.ObjectDelimeter.start:
                console.log("Object start");
                stack.push(new types_1.ParserObject());
                break;
            case exports.ObjectDelimeter.end:
                console.log("Object end");
                if (lastElement instanceof types_1.ParserObject) {
                    const obj = stack.pop();
                    console.log("Finished obj", obj);
                }
                else {
                    throw new Error("Syntax error - expected closing object delimiter");
                }
                break;
            case exports.ArrayDelimeter.start:
                console.log("Array start");
                stack.push(new types_1.ParserArray());
                break;
            case exports.ArrayDelimeter.end:
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
