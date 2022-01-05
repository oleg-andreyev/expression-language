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
var ConstantNode = /** @class */ (function (_super) {
    __extends(ConstantNode, _super);
    function ConstantNode(value, isIdentifier) {
        if (isIdentifier === void 0) { isIdentifier = false; }
        var _this = _super.call(this, {}, { value: value }) || this;
        _this.isIdentifier = isIdentifier;
        _this.name = 'ConstantNode';
        return _this;
    }
    ConstantNode.prototype.compile = function (compiler) {
        compiler.repr(this.attributes.value, this.isIdentifier);
    };
    ConstantNode.prototype.evaluate = function (functions, values) {
        return this.attributes.value;
    };
    ConstantNode.prototype.toArray = function () {
        var array = [], value = this.attributes.value;
        if (this.isIdentifier) {
            array.push(value);
        }
        else if (true === value) {
            array.push('true');
        }
        else if (false === value) {
            array.push('false');
        }
        else if (null === value) {
            array.push('null');
        }
        else if (typeof value === "number") {
            array.push(value);
        }
        else if (typeof value === "string") {
            array.push(this.dumpString(value));
        }
        else if (Array.isArray(value)) {
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var v = value_1[_i];
                array.push(',');
                array.push(new ConstantNode(v));
            }
            array[0] = '[';
            array.push(']');
        }
        else if (this.isHash(value)) {
            for (var _a = 0, _b = Object.keys(value); _a < _b.length; _a++) {
                var k = _b[_a];
                array.push(', ');
                array.push(new ConstantNode(k));
                array.push(': ');
                array.push(new ConstantNode(value[k]));
            }
            array[0] = '{';
            array.push('}');
        }
        return array;
    };
    return ConstantNode;
}(Node_1.default));
exports.default = ConstantNode;
