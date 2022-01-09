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
define(["require", "exports", "./Node", "../lib/range"], function (require, exports, Node_1, range_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BinaryNode = /** @class */ (function (_super) {
        __extends(BinaryNode, _super);
        function BinaryNode(operator, left, right) {
            var _this = _super.call(this, { left: left, right: right }, { operator: operator }) || this;
            _this.name = "BinaryNode";
            return _this;
        }
        BinaryNode.prototype.compile = function (compiler) {
            var operator = this.attributes.operator;
            if ('matches' === operator) {
                compiler.compile(this.nodes.right)
                    .raw(".test(")
                    .compile(this.nodes.left)
                    .raw(")");
                return;
            }
            if (BinaryNode.functions[operator] !== undefined) {
                compiler.raw("".concat(BinaryNode.functions[operator], "("))
                    .compile(this.nodes.left)
                    .raw(", ")
                    .compile(this.nodes.right)
                    .raw(")");
                return;
            }
            if (BinaryNode.operators[operator] !== undefined) {
                operator = BinaryNode.operators[operator];
            }
            compiler.raw("(")
                .compile(this.nodes.left)
                .raw(' ')
                .raw(operator)
                .raw(' ')
                .compile(this.nodes.right)
                .raw(")");
        };
        BinaryNode.prototype.evaluate = function (functions, values) {
            var operator = this.attributes.operator, left = this.nodes.left.evaluate(functions, values);
            //console.log("Evaluating: ", left, operator, right);
            if (BinaryNode.functions[operator] !== undefined) {
                var right_1 = this.nodes.right.evaluate(functions, values);
                switch (operator) {
                    case 'not in':
                        return right_1.indexOf(left) === -1;
                    case 'in':
                        return right_1.indexOf(left) >= 0;
                    case '..':
                        return (0, range_1.range)(left, right_1);
                    case '**':
                        return Math.pow(left, right_1);
                }
            }
            var right = null;
            switch (operator) {
                case 'or':
                case '||':
                    if (!left) {
                        right = this.nodes.right.evaluate(functions, values);
                    }
                    return left || right;
                case 'and':
                case '&&':
                    if (left) {
                        right = this.nodes.right.evaluate(functions, values);
                    }
                    return left && right;
            }
            right = this.nodes.right.evaluate(functions, values);
            var res;
            switch (operator) {
                case '|':
                    return left | right;
                case '^':
                    return left ^ right;
                case '&':
                    return left & right;
                case '==':
                    return left == right;
                case '===':
                    return left === right;
                case '!=':
                    return left != right;
                case '!==':
                    return left !== right;
                case '<':
                    return left < right;
                case '>':
                    return left > right;
                case '>=':
                    return left >= right;
                case '<=':
                    return left <= right;
                case 'not in':
                    return right.indexOf(left) === -1;
                case 'in':
                    return right.indexOf(left) >= 0;
                case '+':
                    return left + right;
                case '-':
                    return left - right;
                case '~':
                    return left.toString() + right.toString();
                case '*':
                    return left * right;
                case '/':
                    return left / right;
                case '%':
                    return left % right;
                case 'matches':
                    res = right.match(BinaryNode.regex_expression);
                    return (new RegExp(res[1], res[2])).test(left);
            }
        };
        BinaryNode.prototype.toArray = function () {
            return ["(", this.nodes.left, ' ' + this.attributes.operator + ' ', this.nodes.right, ")"];
        };
        BinaryNode.regex_expression = /\/(.+)\/(.*)/;
        BinaryNode.operators = {
            '~': '.',
            'and': '&&',
            'or': '||'
        };
        BinaryNode.functions = {
            '**': 'Math.pow',
            '..': 'range',
            'in': 'includes',
            'not in': '!includes'
        };
        return BinaryNode;
    }(Node_1.default));
    exports.default = BinaryNode;
});
