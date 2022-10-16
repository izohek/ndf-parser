"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyPathFromString = exports.inspect = void 0;
function inspect(object, path, index = 0) {
    if (index >= path.length) {
        return;
    }
    const pathItem = path[index];
    const pathObj = object.attributes.filter((a) => {
        return a.name === pathItem;
    });
    console.log(object, pathObj);
    return pathItem;
}
exports.inspect = inspect;
function keyPathFromString(kpString) {
    return kpString.split('.');
}
exports.keyPathFromString = keyPathFromString;
