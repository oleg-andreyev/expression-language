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
var GetAttrNode = /** @class */ (function (_super) {
    __extends(GetAttrNode, _super);
    function GetAttrNode(node, attribute, _arguments, type) {
        var _this = _super.call(this, { node: node, attribute: attribute, arguments: _arguments }, { type: type }) || this;
        _this.name = 'GetAttrNode';
        return _this;
    }
    GetAttrNode.prototype.compile = function (compiler) {
        switch (this.attributes.type) {
            case GetAttrNode.PROPERTY_CALL:
                compiler.compile(this.nodes.node)
                    .raw('.')
                    .raw(this.nodes.attribute.attributes.value);
                break;
            case GetAttrNode.METHOD_CALL:
                compiler.compile(this.nodes.node)
                    .raw('.')
                    .raw(this.nodes.attribute.attributes.value)
                    .raw('(')
                    .compile(this.nodes.arguments)
                    .raw(')');
                break;
            case GetAttrNode.ARRAY_CALL:
                compiler.compile(this.nodes.node)
                    .raw('[')
                    .compile(this.nodes.attribute)
                    .raw(']');
                break;
        }
    };
    GetAttrNode.prototype.evaluate = function (functions, values) {
        switch (this.attributes.type) {
            case GetAttrNode.PROPERTY_CALL:
                var obj = this.nodes.node.evaluate(functions, values), property = this.nodes.attribute.attributes.value;
                if (typeof obj !== "object") {
                    throw new Error("Unable to get property \"".concat(property, "\" on a non-object: ") + (typeof obj));
                }
                return obj[property];
            case GetAttrNode.METHOD_CALL:
                var obj2 = this.nodes.node.evaluate(functions, values), method = this.nodes.attribute.attributes.value;
                if (typeof obj2 !== 'object') {
                    throw new Error("Unable to call method \"".concat(method, "\" on a non-object: ") + (typeof obj2));
                }
                if (obj2[method] === undefined) {
                    throw new Error("Method \"".concat(method, "\" is undefined on object."));
                }
                if (typeof obj2[method] != 'function') {
                    throw new Error("Method \"".concat(method, "\" is not a function on object."));
                }
                var evaluatedArgs = this.nodes.arguments.evaluate(functions, values);
                return obj2[method].apply(null, evaluatedArgs);
            case GetAttrNode.ARRAY_CALL:
                var array = this.nodes.node.evaluate(functions, values);
                if (!Array.isArray(array) && typeof array !== 'object') {
                    throw new Error("Unable to get an item on a non-array: " + typeof array);
                }
                return array[this.nodes.attribute.evaluate(functions, values)];
        }
    };
    GetAttrNode.prototype.toArray = function () {
        switch (this.attributes.type) {
            case GetAttrNode.PROPERTY_CALL:
                return [this.nodes.node, '.', this.nodes.attribute];
            case GetAttrNode.METHOD_CALL:
                return [this.nodes.node, '.', this.nodes.attribute, '(', this.nodes.arguments, ')'];
            case GetAttrNode.ARRAY_CALL:
                return [this.nodes.node, '[', this.nodes.attribute, ']'];
        }
    };
    GetAttrNode.PROPERTY_CALL = 1;
    GetAttrNode.METHOD_CALL = 2;
    GetAttrNode.ARRAY_CALL = 3;
    return GetAttrNode;
}(Node_1.default));
exports.default = GetAttrNode;
