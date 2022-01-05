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
import ExpressionFunction from "../ExpressionFunction";
import AbstractProvider from "./AbstractProvider";
import explode from "locutus/php/strings/explode";
import strlen from "locutus/php/strings/strlen";
import strtolower from "locutus/php/strings/strtolower";
import strtoupper from "locutus/php/strings/strtoupper";
import substr from "locutus/php/strings/substr";
import strstr from "locutus/php/strings/strstr";
import stristr from "locutus/php/strings/stristr";
var StringProvider = /** @class */ (function (_super) {
    __extends(StringProvider, _super);
    function StringProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringProvider.prototype.getFunctions = function () {
        return [
            new ExpressionFunction('strtolower', function (str) {
                return 'strtolower(' + str + ')';
            }, function (args, str) {
                return strtolower(str);
            }),
            new ExpressionFunction('strtoupper', function (str) {
                return 'strtoupper(' + str + ')';
            }, function (args, str) {
                return strtoupper(str);
            }),
            new ExpressionFunction('explode', function (delimiter, string, limit) {
                if (limit === void 0) { limit = 'null'; }
                return "explode(".concat(delimiter, ", ").concat(string, ", ").concat(limit, ")");
            }, function (values, delimiter, string, limit) {
                if (limit === void 0) { limit = null; }
                return explode(delimiter, string, limit);
            }),
            new ExpressionFunction('strlen', function (str) {
                return "strlen(".concat(str, ");");
            }, function evaluator(values, str) {
                return strlen(str);
            }),
            new ExpressionFunction('strstr', function (haystack, needle, before_needle) {
                var remaining = '';
                if (before_needle) {
                    remaining = ", ".concat(before_needle);
                }
                return "strstr(".concat(haystack, ", ").concat(needle).concat(remaining, ");");
            }, function evaluator(values, haystack, needle, before_needle) {
                return strstr(haystack, needle, before_needle);
            }),
            new ExpressionFunction('stristr', function (haystack, needle, before_needle) {
                var remaining = '';
                if (before_needle) {
                    remaining = ", ".concat(before_needle);
                }
                return "stristr(".concat(haystack, ", ").concat(needle).concat(remaining, ");");
            }, function evaluator(values, haystack, needle, before_needle) {
                return stristr(haystack, needle, before_needle);
            }),
            new ExpressionFunction('substr', function (str, start, length) {
                var remaining = '';
                if (length) {
                    remaining = ", ".concat(length);
                }
                return "substr(".concat(str, ", ").concat(start).concat(remaining, ");");
            }, function evaluator(values, str, start, length) {
                return substr(str, start, length);
            })
        ];
    };
    return StringProvider;
}(AbstractProvider));
export default StringProvider;
