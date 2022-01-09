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
define(["require", "exports", "./AbstractProvider", "../ExpressionFunction", "locutus/php/datetime/date", "locutus/php/datetime/strtotime"], function (require, exports, AbstractProvider_1, ExpressionFunction_1, date_1, strtotime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateProvider = /** @class */ (function (_super) {
        __extends(DateProvider, _super);
        function DateProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DateProvider.prototype.getFunctions = function () {
            return [
                new ExpressionFunction_1.default('date', function (format, timestamp) {
                    var remaining = "";
                    if (timestamp) {
                        remaining = ", ".concat(timestamp);
                    }
                    return "date(".concat(format).concat(remaining, ")");
                }, function (values, format, timestamp) {
                    return (0, date_1.default)(format, timestamp);
                }),
                new ExpressionFunction_1.default('strtotime', function (str, now) {
                    var remaining = "";
                    if (now) {
                        remaining = ", ".concat(now);
                    }
                    return "strtotime(".concat(str).concat(remaining, ")");
                }, function (values, str, now) {
                    return (0, strtotime_1.default)(str, now);
                })
            ];
        };
        return DateProvider;
    }(AbstractProvider_1.default));
    exports.default = DateProvider;
});