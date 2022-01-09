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
        define(["require", "exports", "../ExpressionFunction", "./AbstractProvider", "locutus/php/strings/explode", "locutus/php/strings/strlen", "locutus/php/strings/strtolower", "locutus/php/strings/strtoupper", "locutus/php/strings/substr", "locutus/php/strings/strstr", "locutus/php/strings/stristr"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExpressionFunction_1 = require("../ExpressionFunction");
    var AbstractProvider_1 = require("./AbstractProvider");
    var explode_1 = require("locutus/php/strings/explode");
    var strlen_1 = require("locutus/php/strings/strlen");
    var strtolower_1 = require("locutus/php/strings/strtolower");
    var strtoupper_1 = require("locutus/php/strings/strtoupper");
    var substr_1 = require("locutus/php/strings/substr");
    var strstr_1 = require("locutus/php/strings/strstr");
    var stristr_1 = require("locutus/php/strings/stristr");
    var StringProvider = /** @class */ (function (_super) {
        __extends(StringProvider, _super);
        function StringProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StringProvider.prototype.getFunctions = function () {
            return [
                new ExpressionFunction_1.default('strtolower', function (str) {
                    return 'strtolower(' + str + ')';
                }, function (args, str) {
                    return (0, strtolower_1.default)(str);
                }),
                new ExpressionFunction_1.default('strtoupper', function (str) {
                    return 'strtoupper(' + str + ')';
                }, function (args, str) {
                    return (0, strtoupper_1.default)(str);
                }),
                new ExpressionFunction_1.default('explode', function (delimiter, string, limit) {
                    if (limit === void 0) { limit = 'null'; }
                    return "explode(".concat(delimiter, ", ").concat(string, ", ").concat(limit, ")");
                }, function (values, delimiter, string, limit) {
                    if (limit === void 0) { limit = null; }
                    return (0, explode_1.default)(delimiter, string, limit);
                }),
                new ExpressionFunction_1.default('strlen', function (str) {
                    return "strlen(".concat(str, ");");
                }, function evaluator(values, str) {
                    return (0, strlen_1.default)(str);
                }),
                new ExpressionFunction_1.default('strstr', function (haystack, needle, before_needle) {
                    var remaining = '';
                    if (before_needle) {
                        remaining = ", ".concat(before_needle);
                    }
                    return "strstr(".concat(haystack, ", ").concat(needle).concat(remaining, ");");
                }, function evaluator(values, haystack, needle, before_needle) {
                    return (0, strstr_1.default)(haystack, needle, before_needle);
                }),
                new ExpressionFunction_1.default('stristr', function (haystack, needle, before_needle) {
                    var remaining = '';
                    if (before_needle) {
                        remaining = ", ".concat(before_needle);
                    }
                    return "stristr(".concat(haystack, ", ").concat(needle).concat(remaining, ");");
                }, function evaluator(values, haystack, needle, before_needle) {
                    return (0, stristr_1.default)(haystack, needle, before_needle);
                }),
                new ExpressionFunction_1.default('substr', function (str, start, length) {
                    var remaining = '';
                    if (length) {
                        remaining = ", ".concat(length);
                    }
                    return "substr(".concat(str, ", ").concat(start).concat(remaining, ");");
                }, function evaluator(values, str, start, length) {
                    return (0, substr_1.default)(str, start, length);
                })
            ];
        };
        return StringProvider;
    }(AbstractProvider_1.default));
    exports.default = StringProvider;
});
