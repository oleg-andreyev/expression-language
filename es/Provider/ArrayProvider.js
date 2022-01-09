var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../ExpressionFunction", "./AbstractProvider", "locutus/php/array/array_intersect", "locutus/php/array/count", "locutus/php/strings/implode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.arrayIntersectFn = exports.countFn = exports.implodeFn = void 0;
    var ExpressionFunction_1 = require("../ExpressionFunction");
    var AbstractProvider_1 = require("./AbstractProvider");
    var array_intersect_1 = require("locutus/php/array/array_intersect");
    var count_1 = require("locutus/php/array/count");
    var implode_1 = require("locutus/php/strings/implode");
    var ArrayProvider = /** @class */ (function (_super) {
        __extends(ArrayProvider, _super);
        function ArrayProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ArrayProvider.prototype.getFunctions = function () {
            return [
                exports.implodeFn,
                exports.countFn,
                exports.arrayIntersectFn
            ];
        };
        return ArrayProvider;
    }(AbstractProvider_1.default));
    exports.default = ArrayProvider;
    exports.implodeFn = new ExpressionFunction_1.default('implode', function compiler(glue, pieces) {
        //console.log("compile implode: ", pieces, glue, typeof pieces);
        return "implode(".concat(glue, ", ").concat(pieces, ")");
    }, function evaluator(values, glue, pieces) {
        return (0, implode_1.default)(glue, pieces);
    });
    exports.countFn = new ExpressionFunction_1.default('count', function compiler(mixedVar, mode) {
        var remaining = '';
        if (mode) {
            remaining = ", ".concat(mode);
        }
        return "count(".concat(mixedVar).concat(remaining, ")");
    }, function evaluator(values, mixedVar, mode) {
        return (0, count_1.default)(mixedVar, mode);
    });
    exports.arrayIntersectFn = new ExpressionFunction_1.default('array_intersect', function compiler(arr1) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var remaining = '';
        if (rest.length > 0) {
            remaining = ", " + rest.join(", ");
        }
        return "array_intersect(".concat(arr1).concat(remaining, ")");
    }, function evaluator(values) {
        var newArgs = [], allArrays = true;
        for (var i = 1; i < arguments.length; i++) {
            newArgs.push(arguments[i]);
            if (!Array.isArray(arguments[i])) {
                allArrays = false;
            }
        }
        var res = array_intersect_1.default.apply(null, newArgs);
        if (allArrays) {
            return Object.values(res);
        }
        return res;
    });
});
