"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = require("./Node");
var UnaryNode = /** @class */ (function (_super) {
    __extends(UnaryNode, _super);
    function UnaryNode(operator, node) {
        var _this = _super.call(this, { node: node }, { operator: operator }) || this;
        _this.name = 'UnaryNode';
        return _this;
    }
    UnaryNode.prototype.compile = function (compiler) {
        compiler.raw('(')
            .raw(UnaryNode.operators[this.attributes.operator])
            .compile(this.nodes.node)
            .raw(')');
    };
    UnaryNode.prototype.evaluate = function (functions, values) {
        var value = this.nodes.node.evaluate(functions, values);
        switch (this.attributes.operator) {
            case 'not':
            case '!':
                return !value;
            case '-':
                return -value;
        }
        return value;
    };
    UnaryNode.prototype.toArray = function () {
        return ['(', this.attributes.operator + " ", this.nodes.node, ')'];
    };
    UnaryNode.operators = {
        '!': '!',
        'not': '!',
        '+': '+',
        '-': '-'
    };
    return UnaryNode;
}(Node_1.default));
exports.default = UnaryNode;
