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
define(["require", "exports", "./Expression"], function (require, exports, Expression_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ParsedExpression = /** @class */ (function (_super) {
        __extends(ParsedExpression, _super);
        function ParsedExpression(expression, nodes) {
            var _this = _super.call(this, expression) || this;
            _this.nodes = nodes;
            return _this;
        }
        ParsedExpression.prototype.getNodes = function () {
            return this.nodes;
        };
        return ParsedExpression;
    }(Expression_1.default));
    exports.default = ParsedExpression;
});
