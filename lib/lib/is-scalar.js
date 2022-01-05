"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_scalar = void 0;
function is_scalar(mixedVar) {
    //  discuss at: https://locutus.io/php/is_scalar/
    // original by: Paulo Freitas
    //   example 1: is_scalar(186.31)
    //   returns 1: true
    //   example 2: is_scalar({0: 'Kevin van Zonneveld'})
    //   returns 2: false
    return (/boolean|number|string/).test(typeof mixedVar);
}
exports.is_scalar = is_scalar;
