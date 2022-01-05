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
import AbstractProvider from "./AbstractProvider";
import ExpressionFunction from "../ExpressionFunction";
import date from "locutus/php/datetime/date";
import strtotime from "locutus/php/datetime/strtotime";
var DateProvider = /** @class */ (function (_super) {
    __extends(DateProvider, _super);
    function DateProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateProvider.prototype.getFunctions = function () {
        return [
            new ExpressionFunction('date', function (format, timestamp) {
                var remaining = "";
                if (timestamp) {
                    remaining = ", ".concat(timestamp);
                }
                return "date(".concat(format).concat(remaining, ")");
            }, function (values, format, timestamp) {
                return date(format, timestamp);
            }),
            new ExpressionFunction('strtotime', function (str, now) {
                var remaining = "";
                if (now) {
                    remaining = ", ".concat(now);
                }
                return "strtotime(".concat(str).concat(remaining, ")");
            }, function (values, str, now) {
                return strtotime(str, now);
            })
        ];
    };
    return DateProvider;
}(AbstractProvider));
export default DateProvider;
