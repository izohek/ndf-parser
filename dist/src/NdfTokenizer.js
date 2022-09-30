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
        const filteredTokens = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (Constants.IgnoredTypes.includes(token.type)) {
                continue;
            }
            if (Constants.AccessLevels.includes(token.value)) {
                filteredTokens.push(token);
                const obj = this.parseObject(tokens, i + 1);
                i = obj[1];
                filteredTokens.push({
                    type: Constants.ObjectToken,
                    value: obj[0]
                });
            }
            else if (token.type == Constants.IdentifierType) {
                const obj = this.parseObject(tokens, i);
                i = obj[1];
                const type = obj[0].type == Constants.ConstantToken
                    ? Constants.ConstantToken
                    : Constants.ObjectToken;
                filteredTokens.push({
                    type: type,
                    value: obj[0]
                });
            }
            else {
                console.log("Unknown root element", token.type, token.value);
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
            // Object definition
            // example: Descriptor_Unit_2K12_KUB_DDR is TEntityDescriptor
            currentPos += 1;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            if (tokens[currentPos].type == Constants.NumberLiteralType) {
                // Parse object constant
                // example: Flag_Artillerie is 0
                obj.type = "Constant";
                obj.children.push({
                    name: "value",
                    value: tokens[currentPos].value
                });
                currentPos += 1;
            }
            else {
                // Parse object type name
                // example: Descriptor_Unit_2K12_KUB_DDR is TEntityDescriptor
                obj.type = tokens[currentPos].value;
                currentPos += 1;
                currentPos = this.ffWhiteSpace(tokens, currentPos);
                let [children, index] = this.parseObjectBody(tokens, currentPos);
                obj.children.push(...children);
                currentPos = index;
            }
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
            console.log(tokens[currentPos].value);
            throw new Error("Syntax error: expecting object starting delimeter");
        }
        currentPos += 1;
        currentPos = this.ffWhiteSpace(tokens, currentPos);
        while (tokens[currentPos].value != Constants.ObjectDelimeter.end) {
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
            // GUID string
            // example: DescriptorId = GUID:{2943c3ae-bf4f-4f01-9897-be36555b3118}
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
            // String literal
            // example: DeckName = 'SJEUHLLSUW'
            const value = tokens[position].value;
            return [
                value,
                position + 1
            ];
        }
        else if (tokens[position].type == Constants.NumberLiteralType) {
            // Number literal
            // example: ExperienceLevel = 2
            const value = tokens[position].value;
            return [
                value,
                position + 1
            ];
        }
        else if (tokens[position].value == Constants.TildeToken) {
            // Tilde path value
            // example: Transport = ~/Descriptor_Unit_M113A1G_RFA
            let [value, currentPos] = this.parseTildeValue(tokens, position);
            return [
                value,
                currentPos
            ];
        }
        else if (tokens[position].value == Constants.ArrayDelimeter.start) {
            // Arrays
            // DeckCombatGroupList =
            // [
            //   ... 
            // ]
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
        else if (tokens[position].value == Constants.MapToken) {
            // Maps
            // example: DivisionIds = MAP [
            //   (Descriptor_Deck_Division_RDA_7_Panzer_multi, 9),
            // ]  
            const [map, newPosition] = this.parseMap(tokens, position);
            return [
                map,
                newPosition
            ];
        }
        else if (tokens[position].type == Constants.IdentifierType) {
            const [str, newPosition] = this.parseUntilEol(tokens, position);
            // Look ahead to see if identifier or object definition
            const lookaheadPos = this.ffWhiteSpace(tokens, newPosition);
            if (tokens[lookaheadPos].value == Constants.ObjectDelimeter.start) {
                let [objectChildren, newLAPosition] = this.parseObjectBody(tokens, lookaheadPos);
                let newObject = new types_1.ParserObject();
                newObject.name = str;
                newObject.children.push(...objectChildren);
                return [
                    newObject,
                    newLAPosition + 1
                ];
            }
            return [
                str,
                newPosition
            ];
        }
        else {
            console.log("Unknown value", tokens[position]);
            throw new Error("Unknown Child Value");
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
        for (let i = 1; i < arrayTokens.length; i++) {
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
                    outArray.values.push(object);
                    i = newIndex;
                    break;
                case Constants.StringLiteralType:
                case Constants.NumberLiteralType:
                    outArray.values.push(arrayTokens[i].value);
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
    parseTildeValue(tokens, position, delimeter = [Constants.LineTerminatorSequence]) {
        let currentPos = position;
        let value = "";
        while (!delimeter.includes(tokens[currentPos].type)) {
            console.log(tokens[currentPos].value);
            value += tokens[currentPos].value;
            currentPos += 1;
        }
        if (value.endsWith(Constants.CommaToken)) {
            value = value.slice(0, -1);
        }
        return [value, currentPos];
    }
    /**
     * Parse an NDF MAP
     *
     * @param tokens
     * @param position
     * @returns
     */
    parseMap(tokens, position) {
        let currentPos = position;
        let mapValue = [];
        if (tokens[currentPos].value != Constants.MapToken) {
            throw new Error("Expected 'MAP' starting token.");
        }
        currentPos++;
        currentPos = this.ffWhiteSpace(tokens, currentPos);
        if (tokens[currentPos].value != Constants.ArrayDelimeter.start) {
            throw new Error("Expected array starting delimeter");
        }
        currentPos++;
        currentPos = this.ffWhiteSpace(tokens, currentPos);
        const stack = [Constants.ArrayDelimeter.start];
        while (stack.length > 0) {
            if (tokens[currentPos].value == Constants.ArrayDelimeter.end) {
                stack.pop();
            }
            else {
                // Parse tuple
                if (tokens[currentPos].value == Constants.TupleDelimiter.start) {
                    let [tuple, newPos] = this.parseTuple(tokens, currentPos);
                    mapValue.push(tuple);
                    currentPos = newPos;
                }
                else {
                    console.log(tokens[currentPos], mapValue);
                    throw new Error("Unknown Map value token");
                }
            }
            currentPos++;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            if (currentPos >= tokens.length) {
                throw new Error("Unbound MAP object missing ending delimeter");
            }
        }
        // throw new Error("Unimplemented: MAP")
        return [
            mapValue,
            currentPos
        ];
    }
    /**
     * Parse a tuple value like "(Descriptor_Deck_Pack_TOE_US_3rd_Arm_multi_AH1F_Cobra_US, 365)"
     * @param tokens
     * @param position
     * @returns
     */
    parseTuple(tokens, position) {
        let currentPos = position;
        let stack = [];
        let tuple = [];
        if (tokens[currentPos].value != Constants.TupleDelimiter.start) {
            throw new Error("Expecting token start delimeter");
        }
        stack.push(tokens[currentPos]);
        currentPos++;
        let valueStack = [];
        while (stack.length > 0) {
            if (tokens[currentPos].value == Constants.TupleDelimiter.end) {
                let value = valueStack.reduce((prev, cur) => prev + cur.value, "");
                valueStack = [];
                tuple.push(value);
                stack.pop();
            }
            else if (Constants.ValueTypes.includes(tokens[currentPos].type)) {
                valueStack.push(tokens[currentPos]);
            }
            else if (tokens[currentPos].value == Constants.CommaToken) {
                let value = valueStack.reduce((prev, cur) => prev + cur.value, "");
                valueStack = [];
                tuple.push(value);
            }
            else if (tokens[currentPos].value == Constants.TildeToken) {
                // if next is reg ex we have to do some cleanup
                // currentPos++
                if (tokens[currentPos + 1].type = Constants.RegularExpressionType) {
                    const regexTokens = tokens[currentPos + 1].value.split(",");
                    let newTupleValue = Constants.TildeToken;
                    for (let j = 0; j < regexTokens.length; j++) {
                        const newRegTkn = regexTokens[j].split(")");
                        for (let t = 0; t < newRegTkn.length; t++) {
                            newTupleValue += newRegTkn[t];
                            if (newTupleValue) {
                                tuple.push(newTupleValue.trim());
                                newTupleValue = "";
                            }
                            if (t > 0) {
                                stack.pop();
                            }
                        }
                    }
                }
                else {
                    let tildeResults = this.parseTildeValue(tokens, currentPos, [Constants.LineTerminatorSequence, Constants.CommaToken]);
                    tuple.push(tildeResults[0]);
                    currentPos = tildeResults[1];
                }
            }
            else {
                console.log(tokens[currentPos].value, tokens[currentPos].type);
                throw new Error("Unknown tuple inner value");
            }
            currentPos++;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            if (currentPos >= tokens[currentPos].length) {
                throw new Error("Unbound tuple object missing ending delimeter");
            }
        }
        return [tuple, currentPos];
    }
    /**
     * Parse string token until end of the line
     *
     * @param tokens
     * @param position
     * @returns
     */
    parseUntilEol(tokens, position) {
        let currentPos = position;
        let values = [];
        while (tokens[currentPos].type != Constants.LineTerminatorSequence) {
            values.push(tokens[currentPos]);
            currentPos++;
        }
        return [
            values.reduce((prev, next) => prev + next.value, ""),
            currentPos
        ];
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
