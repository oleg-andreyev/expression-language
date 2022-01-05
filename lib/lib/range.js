"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
function range(start, end) {
    var result = [];
    for (var i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}
exports.range = range;
