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
    constructor() {
        /// Log parsing progress to console
        this.debug = false;
    }
    /**
     * Tokenize an ndf file into understandable, logical tokens.
     *
     * Logical tokens, not syntax tokens.
     *
     * @param str
     * @returns
     */
    tokenize(str) {
        const tokens = this.santizeTokens(Array.from((0, js_tokens_1.default)(str)));
        if (this.debug) {
            console.log(tokens);
        }
        return this.parseTokens(tokens);
    }
    /**
     * Perform pref and sanitation on the jsTokens result.
     *
     * @param tokens
     * @returns
     */
    santizeTokens(tokens) {
        const sanitizedTokens = [];
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === Constants.IdentifierType) {
                /// Combine into string hack
                /// Takes form of {identifier}{/}{identifier} and merges into a single identifier
                const next = tokens[i + 1].type === Constants.PunctuatorType && tokens[i + 1].value === '/';
                const nextNext = tokens[i + 2].type === Constants.IdentifierType;
                if (next && nextNext) {
                    const womboCombo = {
                        type: Constants.IdentifierType,
                        value: tokens[i].value + tokens[i + 1].value + tokens[i + 2].value
                    };
                    i += 2;
                    sanitizedTokens.push(womboCombo);
                    continue;
                }
            }
            if (tokens[i].type === Constants.RegularExpressionType) {
                if (tokens[i].value.endsWith(Constants.ObjectDelimeter.end + '' + Constants.CommaToken)) {
                    const newTokens = [
                        {
                            type: Constants.RegularExpressionType,
                            value: tokens[i].value.slice(0, -2),
                            closed: false
                        },
                        {
                            type: Constants.PunctuatorType,
                            value: Constants.ObjectDelimeter.end
                        }, {
                            type: Constants.PunctuatorType,
                            value: Constants.CommaToken
                        }
                    ];
                    sanitizedTokens.push(...newTokens);
                    continue;
                }
            }
            sanitizedTokens.push(tokens[i]);
        }
        return sanitizedTokens;
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
            else if (token.type === Constants.IdentifierType) {
                const obj = this.parseObject(tokens, i);
                i = obj[1];
                const type = obj[0].type === Constants.ConstantToken
                    ? Constants.ConstantToken
                    : Constants.ObjectToken;
                filteredTokens.push({
                    type,
                    value: obj[0]
                });
            }
            else {
                console.log('Unknown root element', i, token.type, token.value);
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
        if (tokens[currentPos].type === Constants.IdentifierType) {
            obj.name = tokens[currentPos].value;
            if (this.debug) {
                console.log(obj.name);
            }
            currentPos += 1;
        }
        else {
            throw new Error('Syntax error: expecting object name');
        }
        currentPos = this.ffWhiteSpace(tokens, currentPos);
        if (tokens[currentPos].value === Constants.TypeDefinitionDelimeter) {
            // Object definition
            // example: Descriptor_Unit_2K12_KUB_DDR is TEntityDescriptor
            currentPos += 1;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            if (tokens[currentPos].type === Constants.NumberLiteralType) {
                // Parse object constant
                // example: Flag_Artillerie is 0
                obj.type = 'Constant';
                obj.children.push({
                    name: 'value',
                    value: tokens[currentPos].value
                });
                currentPos += 1;
            }
            else {
                // Parse object type name
                // example: Descriptor_Unit_2K12_KUB_DDR is TEntityDescriptor
                obj.type = tokens[currentPos].value;
                if (obj.type === Constants.MapToken) {
                    // Map defined using 'is' syntax
                    // example: MatrixCostName_DivTest_US is MAP
                    currentPos = this.ffWhiteSpace(tokens, currentPos);
                    let [map, newPosition] = this.parseMap(tokens, currentPos);
                    currentPos = newPosition;
                    obj.children.push({
                        name: 'map',
                        value: map
                    });
                    return [obj, currentPos];
                }
                else {
                    // Object
                    currentPos += 1;
                    currentPos = this.ffWhiteSpace(tokens, currentPos);
                    const [children, index] = this.parseObjectBody(tokens, currentPos);
                    obj.children.push(...children);
                    currentPos = index;
                }
            }
        }
        else if (tokens[currentPos].value === Constants.ObjectDelimeter.start) {
            const [children, index] = this.parseObjectBody(tokens, currentPos);
            obj.children.push(...children);
            currentPos = index;
        }
        else {
            // Object name only, no body or parens.
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
        const children = [];
        if (tokens[currentPos].value !== Constants.ObjectDelimeter.start) {
            console.log(tokens[currentPos].value);
            throw new Error('Syntax error: expecting object starting delimeter');
        }
        currentPos += 1;
        currentPos = this.ffWhiteSpace(tokens, currentPos);
        while (tokens[currentPos].value !== Constants.ObjectDelimeter.end) {
            if (tokens[currentPos].type !== Constants.IdentifierType) {
                console.log(tokens[currentPos].type, tokens[currentPos].value, currentPos);
                throw new Error('Syntax error: expecting object child name');
            }
            const name = tokens[currentPos].value;
            currentPos += 1;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            if (![Constants.AssignmentToken, Constants.TypeDefinitionDelimeter].includes(tokens[currentPos].value)) {
                console.log(tokens[currentPos], currentPos);
                throw new Error('Syntax error: expecting object child assignment');
            }
            currentPos += 1;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            const [parsedValue, index] = this.parseObjectChildValue(tokens, currentPos);
            children.push({
                name,
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
        if (tokens[position].value === Constants.GuidToken) {
            // GUID string
            // example: DescriptorId = GUID:{2943c3ae-bf4f-4f01-9897-be36555b3118}
            let guidStr = tokens[position].value;
            let currentPos = position + 1;
            if (tokens[currentPos].value !== Constants.GuidTokenColon) {
                throw new Error('Syntax error: malformed guid, needs colon');
            }
            guidStr += tokens[currentPos].value;
            currentPos += 1;
            if (tokens[currentPos].value !== Constants.GuidDelimeter.start) {
                console.log(tokens[currentPos].value);
                throw new Error('Syntax error: guid expected guid delimiter start');
            }
            guidStr += tokens[currentPos].value;
            currentPos += 1;
            while (tokens[currentPos].value !== Constants.GuidDelimeter.end) {
                guidStr += tokens[currentPos].value;
                currentPos += 1;
            }
            guidStr += tokens[currentPos].value;
            currentPos += 1;
            return [
                {
                    value: guidStr,
                    ndf: 'guid'
                },
                currentPos
            ];
        }
        else if (tokens[position].type === Constants.StringLiteralType) {
            // String literal
            // example: DeckName = 'SJEUHLLSUW'
            const value = tokens[position].value;
            return [
                { value, ndf: 'string' },
                position + 1
            ];
        }
        else if (tokens[position].type === Constants.NumberLiteralType) {
            // Number literal
            // example: ExperienceLevel = 2
            return this.parseNumericExpressionValue(tokens, position);
        }
        else if (tokens[position].value === Constants.TildeToken) {
            // Tilde path value
            // example: Transport = ~/Descriptor_Unit_M113A1G_RFA
            return this.parseTildeValue(tokens, position);
        }
        else if (tokens[position].value === Constants.ArrayDelimeter.start) {
            // Arrays
            // DeckCombatGroupList =
            // [
            //   ...
            // ]
            let arrayValue = '';
            arrayValue += tokens[position].value;
            const stack = [tokens[position].value];
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
        else if (tokens[position].value === Constants.MapToken) {
            // Maps
            // example: DivisionIds = MAP [
            //   (Descriptor_Deck_Division_RDA_7_Panzer_multi, 9),
            // ]
            return this.parseMap(tokens, position);
        }
        else if (tokens[position].type === Constants.IdentifierType) {
            const [str, newPosition] = this.parseEntity(tokens, position);
            if (this.debug) {
                console.log('Child ID : ', str);
            }
            // Look ahead to see if identifier or object definition
            const lookaheadPos = this.ffWhiteSpace(tokens, newPosition);
            if (tokens[lookaheadPos].value === Constants.ObjectDelimeter.start) {
                const [objectChildren, newLAPosition] = this.parseObjectBody(tokens, lookaheadPos);
                const newObject = new types_1.ParserObject();
                newObject.name = (str.ndf === 'string') ? str.value : '';
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
        else if (tokens[position].value === Constants.ObjectDelimeter.start) {
            const [exprVal, newPosition] = this.parseExpressionValue(tokens, position);
            return [exprVal, newPosition + 1];
        }
        else if (tokens[position].value === Constants.NegativeNumberToken && tokens[position + 1].type === Constants.NumberLiteralType) {
            const [value, newPosition] = this.parseNumericExpressionValue(tokens, position + 1);
            return [
                { value: Constants.NegativeNumberToken + value.value, ndf: 'string' },
                newPosition
            ];
        }
        else {
            console.log('Unknown value', tokens[position]);
            throw new Error('Unknown Child Value');
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
        const outArray = new types_1.ParserArray();
        //
        // Setup and sanity checks
        //
        // Remove white space and other ignored tokens
        const arrayTokens = this.santizeTokens(Array.from((0, js_tokens_1.default)(arrayString)));
        // Make sure we have data
        if (arrayTokens.length < 1) {
            return outArray;
        }
        const stack = []; // delimiter stack
        let index = 0; // parser position
        // Syntax should start with array delimiter start => [
        if (arrayTokens[index].value === Constants.ArrayDelimeter.start) {
            stack.push(arrayTokens[index].value);
            index++;
        }
        else {
            throw new Error('Expecting array start delimiter as first token.');
        }
        //
        // Parse tokens representing array
        //
        // parse loop
        for (let i = index; i < arrayTokens.length; i++) {
            // Skip whitespace
            i = this.ffWhiteSpace(arrayTokens, i);
            const token = arrayTokens[i];
            // Check for empty array
            if (token.value === Constants.ArrayDelimeter.end) {
                stack.pop();
                break;
            }
            switch (token.type) {
                // Parse: Object
                case Constants.IdentifierType: {
                    const [object, newIndex] = this.parseObject(arrayTokens, i);
                    outArray.values.push(object);
                    i = newIndex;
                    // If the next element is an array end we move the index back one so it triggers
                    // the for loop pop on next iteration.  Might wantto look at it again.
                    if (arrayTokens[i].value === Constants.ArrayDelimeter.end) {
                        i--;
                    }
                    break;
                }
                case Constants.StringLiteralType:
                case Constants.NumberLiteralType:
                    outArray.values.push({
                        value: arrayTokens[i].value,
                        ndf: 'string'
                    });
                    break;
                // Parse: Path/tilde leading value or negative number
                case Constants.PunctuatorType:
                    if (token.value === Constants.TildeToken) {
                        const [tildeValue, position] = this.parseTildeValue(arrayTokens, i);
                        outArray.values.push(tildeValue);
                        i = position;
                        // If the next element is an array end we move the index back one so it triggers
                        // the for loop pop on next iteration.  Limitation of parsetilde i think, might want
                        // to look at it again.
                        if (arrayTokens[position].value === Constants.ArrayDelimeter.end) {
                            i--;
                        }
                    }
                    else if (token.value === Constants.NegativeNumberToken) {
                        // Punctuators can also indicate a negative number as the '-' sign is treated
                        // as a punctuator by the jstoken library.
                        const [numericValue, pos] = this.parseNumericExpressionValue(arrayTokens, i + 1);
                        numericValue.value = Constants.NegativeNumberToken + numericValue.value;
                        outArray.values.push(numericValue);
                        i = pos;
                    }
                    break;
                default:
                    break;
            }
        }
        if (stack.length > 0) {
            throw new Error('Missing array delimiter end character');
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
        let value = '';
        const disallowedValues = [
            Constants.ObjectDelimeter.end,
            Constants.ArrayDelimeter.end
        ];
        while (!delimeter.includes(tokens[currentPos].type) && !disallowedValues.includes(tokens[currentPos].value)) {
            value += tokens[currentPos].value;
            currentPos += 1;
        }
        if (value.endsWith(Constants.CommaToken)) {
            value = value.slice(0, -1);
        }
        return [{ value, ndf: 'tilde' }, currentPos];
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
        const mapValue = {
            value: [],
            ndf: 'map'
        };
        if (tokens[currentPos].value !== Constants.MapToken) {
            throw new Error("Expected 'MAP' starting token.");
        }
        currentPos++;
        currentPos = this.ffWhiteSpace(tokens, currentPos);
        if (tokens[currentPos].value !== Constants.ArrayDelimeter.start) {
            throw new Error('Expected array starting delimeter');
        }
        currentPos++;
        currentPos = this.ffWhiteSpace(tokens, currentPos);
        const stack = [Constants.ArrayDelimeter.start];
        while (stack.length > 0) {
            if (tokens[currentPos].value === Constants.ArrayDelimeter.end) {
                stack.pop();
                // If stack's empty, we're done
                if (stack.length < 1) {
                    break;
                }
            }
            else {
                // Parse tuple
                if (tokens[currentPos].value === Constants.TupleDelimiter.start) {
                    const [tuple, newPos] = this.parseTuple(tokens, currentPos);
                    mapValue.value.push(tuple);
                    currentPos = newPos;
                }
                else {
                    console.log(tokens[currentPos], mapValue);
                    throw new Error('Unknown Map value token');
                }
            }
            currentPos++;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            if (currentPos >= tokens.length) {
                if (stack.length < 1) {
                    // If stack's empty and we're at the end of file, we're done
                    break;
                }
                throw new Error('Unbound MAP object missing ending delimeter');
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
        const stack = [];
        const tuple = [];
        if (tokens[currentPos].value !== Constants.TupleDelimiter.start) {
            throw new Error('Expecting token start delimeter');
        }
        stack.push(tokens[currentPos]);
        currentPos++;
        let valueStack = [];
        while (stack.length > 0) {
            const ffLookBehindIndex = currentPos;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            if (tokens[currentPos].value === Constants.TupleDelimiter.end) {
                if (valueStack.length > 0) {
                    const value = valueStack.reduce((prev, cur) => prev + cur.value, '');
                    valueStack = [];
                    tuple.push({
                        value,
                        ndf: 'string'
                    });
                }
                stack.pop();
            }
            else if (Constants.ValueTypes.includes(tokens[currentPos].type) || tokens[currentPos].value === '/' || tokens[currentPos].value === '*') {
                // TODO: currently this solution strips the whitespace if the value is a numeric expression like "3000.0 * metre"
                // This happens because the white space is fast-forwarded after every value while the value stack is building
                // and before it gets reduce and put into the tuple as a single value.
                // Probably can just do an inner loop here to build the value instead of it happening over many outer loop iterations.
                valueStack.push(tokens[currentPos]);
            }
            else if (tokens[currentPos].value === Constants.CommaToken) {
                const value = valueStack.reduce((prev, cur) => prev + cur.value, '');
                valueStack = [];
                tuple.push({
                    value,
                    ndf: 'string'
                });
            }
            else if (tokens[currentPos].value === Constants.TildeToken) {
                // if next is reg ex we have to do some cleanup
                // currentPos++
                if (tokens[currentPos + 1].type === Constants.RegularExpressionType) {
                    const regexTokens = tokens[currentPos + 1].value.split(',');
                    let newTupleValue = Constants.TildeToken;
                    for (let j = 0; j < regexTokens.length; j++) {
                        const newRegTkn = regexTokens[j].split(')');
                        for (let t = 0; t < newRegTkn.length; t++) {
                            newTupleValue += newRegTkn[t];
                            if (newTupleValue.length > 0) {
                                tuple.push({
                                    value: newTupleValue.trim(),
                                    ndf: 'string'
                                });
                                newTupleValue = '';
                            }
                            if (t > 0) {
                                stack.pop();
                            }
                        }
                    }
                    currentPos++;
                }
                else {
                    const tildeResults = this.parseTildeValue(tokens, currentPos, [Constants.LineTerminatorSequence, Constants.CommaToken]);
                    tuple.push(tildeResults[0]);
                    currentPos = tildeResults[1];
                }
            }
            else if (tokens[currentPos].value === Constants.ArrayDelimeter.start) {
                const [arrayString, newPosition] = this.generateArrayString(tokens, currentPos);
                const parsedArray = this.parseArray(arrayString);
                tuple.push(parsedArray);
                currentPos = newPosition - 2;
            }
            else if (tokens[currentPos].value === Constants.NegativeNumberToken) {
                // Parse negative number.
                // jstokens splits the '-' from the number so we have to combine manually.
                const [numericValue, pos] = this.parseNumericExpressionValue(tokens, currentPos + 1);
                numericValue.value = Constants.NegativeNumberToken + numericValue.value;
                tuple.push(numericValue);
                currentPos = pos - 1;
            }
            else if (tokens[currentPos].value === Constants.ObjectDelimeter.start && valueStack.length === 1 && valueStack[0].type === Constants.IdentifierType) {
                // Parse object instance
                // We have to go backwards since the name of the object is stored in the valueStack
                // We rewind whitespace until we hit the name and then parse the full object.
                // Clear-up value stack so it does't get double-added at the end.
                const rewindIndex = this.rewindWhiteSpace(tokens, ffLookBehindIndex - 1);
                const [object, newPosition] = this.parseObject(tokens, rewindIndex);
                tuple.push(object);
                currentPos = newPosition;
                valueStack = [];
            }
            else {
                console.log(tokens[currentPos].value, tokens[currentPos].type);
                throw new Error('Unknown tuple inner value');
            }
            currentPos++;
            currentPos = this.ffWhiteSpace(tokens, currentPos);
            if (currentPos >= tokens[currentPos].length) {
                throw new Error('Unbound tuple object missing ending delimeter');
            }
        }
        return [{ value: tuple, ndf: 'tuple' }, currentPos];
    }
    /**
     * Parse a (probable) math expression usually when assigned as a child value.
     *
     * @param tokens
     * @param position
     * @returns
     */
    parseExpressionValue(tokens, position) {
        let currentPosition = position;
        let value = '(';
        if (tokens[currentPosition].value !== Constants.ObjectDelimeter.start) {
            throw new Error('Incorrect expression starting character: ');
        }
        const stack = [Constants.ObjectDelimeter.start];
        currentPosition++;
        while (stack.length > 0 && currentPosition <= tokens.length) {
            switch (tokens[currentPosition].value) {
                case Constants.ObjectDelimeter.start:
                    stack.push(tokens[currentPosition].value);
                    break;
                case Constants.ObjectDelimeter.end:
                    stack.pop();
                    break;
            }
            value += tokens[currentPosition].value;
            currentPosition++;
        }
        return [
            { value, ndf: 'string' },
            currentPosition
        ];
    }
    /**
     * Parse an expression leading with a number.  Could be just a number literal or something
     * like a math equation.
     *
     * @param tokens
     * @param position
     * @returns
     */
    parseNumericExpressionValue(tokens, position) {
        let currentPosition = position;
        let value = '';
        if (tokens[currentPosition].type !== Constants.NumberLiteralType) {
            throw new Error('Numeric expression expected to start with a numeric value.');
        }
        value = tokens[currentPosition].value;
        currentPosition++;
        const terminatingValues = [
            Constants.CommaToken, Constants.ObjectDelimeter.end
        ];
        while (tokens[currentPosition].type !== Constants.LineTerminatorSequence && !terminatingValues.includes(tokens[currentPosition].value)) {
            value += tokens[currentPosition].value;
            currentPosition++;
        }
        return [
            { value, ndf: 'string' },
            currentPosition
        ];
    }
    /**
     * Parse string token until end of the line
     *
     * @param tokens
     * @param position
     * @returns
     */
    parseEntity(tokens, position) {
        let currentPos = position;
        const values = [];
        const terminatingTypes = [
            Constants.LineTerminatorSequence
        ];
        const terminatingValues = [
            Constants.ObjectDelimeter.start,
            Constants.ObjectDelimeter.end,
            Constants.CommaToken
        ];
        if (tokens[currentPos].value === Constants.RgbaDelimeter) {
            return this.parseRgbaValue(tokens, currentPos);
        }
        while (!terminatingTypes.includes(tokens[currentPos].type) && !terminatingValues.includes(tokens[currentPos].value)) {
            values.push(tokens[currentPos]);
            currentPos++;
        }
        return [
            { value: values.reduce((prev, next) => prev + next.value, ''), ndf: 'string' },
            currentPos
        ];
    }
    /**
     * Parse an NDF RGBA value.
     *
     * Example: DispersionRadiusOffColor = RGBA[0,0,0,0]
     *
     * @param tokens
     * @param position
     * @returns
     */
    parseRgbaValue(tokens, position) {
        let currentPos = position;
        if (tokens[currentPos].value !== Constants.RgbaDelimeter) {
            throw new Error('Invalid RGBA starting value');
        }
        currentPos++;
        const [arrayString, newPosition] = this.generateArrayString(tokens, currentPos);
        const parsedArray = this.parseArray(arrayString);
        if (parsedArray.values.length !== 4) {
            throw new Error('Invalid RGBA value count.');
        }
        const r = (parsedArray.values[0].ndf === 'string') ? parsedArray.values[0].value : '';
        const g = (parsedArray.values[1].ndf === 'string') ? parsedArray.values[1].value : '';
        const b = (parsedArray.values[2].ndf === 'string') ? parsedArray.values[2].value : '';
        const a = (parsedArray.values[3].ndf === 'string') ? parsedArray.values[3].value : '';
        const rgba = {
            name: 'rgba',
            r,
            g,
            b,
            a,
            ndf: 'rgba'
        };
        return [rgba, newPosition];
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
        while (currentPos < tokens.length && Constants.IgnoredTypes.includes(tokens[currentPos].type)) {
            currentPos += 1;
        }
        return currentPos;
    }
    /**
     * Rewind the parser position through ignored types including white space and comments.
     *
     * @param tokens
     * @param position
     * @returns
     */
    rewindWhiteSpace(tokens, position) {
        let currentPos = position;
        while (Constants.IgnoredTypes.includes(tokens[currentPos].type) && currentPos > -1) {
            currentPos -= 1;
        }
        return currentPos;
    }
    generateArrayString(tokens, position) {
        if (tokens[position].value !== Constants.ArrayDelimeter.start) {
            throw new Error('Array string tokens must start with array start delimeter.');
        }
        let arrayValue = '';
        arrayValue += tokens[position].value;
        const stack = [tokens[position].value];
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
        return [arrayValue, currentPos];
    }
}
exports.NdfTokenizer = NdfTokenizer;
