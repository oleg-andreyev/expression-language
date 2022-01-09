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
        define(["require", "exports", "./Node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Node_1 = require("./Node");
    var ConditionalNode = /** @class */ (function (_super) {
        __extends(ConditionalNode, _super);
        function ConditionalNode(expr1, expr2, expr3) {
            var _this = _super.call(this, {
                expr1: expr1, expr2: expr2, expr3: expr3
            }) || this;
            _this.name = 'ConditionalNode';
            return _this;
        }
        ConditionalNode.prototype.compile = function (compiler) {
            compiler.raw('((')
                .compile(this.nodes.expr1)
                .raw(') ? (')
                .compile(this.nodes.expr2)
                .raw(') : (')
                .compile(this.nodes.expr3)
                .raw('))');
        };
        ConditionalNode.prototype.evaluate = function (functions, values) {
            if (this.nodes.expr1.evaluate(functions, values)) {
                return this.nodes.expr2.evaluate(functions, values);
            }
            return this.nodes.expr3.evaluate(functions, values);
        };
        ConditionalNode.prototype.toArray = function () {
            return ['(', this.nodes.expr1, ' ? ', this.nodes.expr2, ' : ', this.nodes.expr3, ')'];
        };
        return ConditionalNode;
    }(Node_1.default));
    exports.default = ConditionalNode;
});
