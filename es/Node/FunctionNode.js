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
define(["require", "exports", "./Node"], function (require, exports, Node_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FunctionNode = /** @class */ (function (_super) {
        __extends(FunctionNode, _super);
        function FunctionNode(name, _arguments) {
            var _this = 
            //console.log("Creating function node: ", name, _arguments);
            _super.call(this, { arguments: _arguments }, { name: name }) || this;
            _this.name = 'FunctionNode';
            return _this;
        }
        FunctionNode.prototype.compile = function (compiler) {
            var _arguments = [];
            for (var _i = 0, _a = Object.values(this.nodes.arguments.nodes); _i < _a.length; _i++) {
                var node = _a[_i];
                _arguments.push(compiler.subcompile(node));
            }
            var fn = compiler.getFunction(this.attributes.name);
            compiler.raw(fn.compiler.apply(null, _arguments));
        };
        FunctionNode.prototype.evaluate = function (functions, values) {
            var _arguments = [values];
            for (var _i = 0, _a = Object.values(this.nodes.arguments.nodes); _i < _a.length; _i++) {
                var node = _a[_i];
                //console.log("Testing: ", node, functions, values);
                _arguments.push(node.evaluate(functions, values));
            }
            return functions[this.attributes.name]['evaluator'].apply(null, _arguments);
        };
        FunctionNode.prototype.toArray = function () {
            var array = [];
            array.push(this.attributes.name);
            for (var _i = 0, _a = Object.values(this.nodes.arguments.nodes); _i < _a.length; _i++) {
                var node = _a[_i];
                array.push(', ');
                array.push(node);
            }
            array[1] = '(';
            array.push(')');
            return array;
        };
        return FunctionNode;
    }(Node_1.default));
    exports.default = FunctionNode;
});
