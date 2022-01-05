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
import Node from "./Node";
import ConstantNode from "./ConstantNode";
var ArrayNode = /** @class */ (function (_super) {
    __extends(ArrayNode, _super);
    function ArrayNode() {
        var _this = _super.call(this, []) || this;
        _this.name = "ArrayNode";
        _this.type = "Array";
        _this.index = -1;
        _this.keyIndex = -1;
        return _this;
    }
    ArrayNode.prototype.addElement = function (value, key) {
        if (key === void 0) { key = null; }
        if (null === key) {
            key = new ConstantNode(++this.index);
        }
        else {
            if (this.type === 'Array') {
                this.type = 'Object';
            }
        }
        this.nodes[(++this.keyIndex).toString()] = key;
        this.nodes[(++this.keyIndex).toString()] = value;
    };
    ArrayNode.prototype.compile = function (compiler) {
        if (this.type === 'Object') {
            compiler.raw('{');
        }
        else {
            compiler.raw('[');
        }
        this.compileArguments(compiler, this.type !== "Array");
        if (this.type === 'Object') {
            compiler.raw('}');
        }
        else {
            compiler.raw(']');
        }
    };
    ArrayNode.prototype.evaluate = function (functions, values) {
        var result;
        if (this.type === 'Array') {
            result = [];
            for (var _i = 0, _a = this.getKeyValuePairs(); _i < _a.length; _i++) {
                var pair = _a[_i];
                result.push(pair.value.evaluate(functions, values));
            }
        }
        else {
            result = {};
            for (var _b = 0, _c = this.getKeyValuePairs(); _b < _c.length; _b++) {
                var pair = _c[_b];
                result[pair.key.evaluate(functions, values)] = pair.value.evaluate(functions, values);
            }
        }
        return result;
    };
    ArrayNode.prototype.toArray = function () {
        var value = {};
        for (var _i = 0, _a = this.getKeyValuePairs(); _i < _a.length; _i++) {
            var pair = _a[_i];
            value[pair.key.attributes.value] = pair.value;
        }
        var array = [];
        if (this.isHash(value)) {
            for (var _b = 0, _c = Object.keys(value); _b < _c.length; _b++) {
                var k = _c[_b];
                array.push(', ');
                array.push(new ConstantNode(k));
                array.push(': ');
                array.push(value[k]);
            }
            array[0] = '{';
            array.push('}');
        }
        else {
            for (var _d = 0, _e = Object.values(value); _d < _e.length; _d++) {
                var v = _e[_d];
                array.push(', ');
                array.push(v);
            }
            array[0] = '[';
            array.push(']');
        }
        return array;
    };
    ArrayNode.prototype.getKeyValuePairs = function () {
        var pairs = [];
        var nodes = Object.values(this.nodes);
        var i, j, pair, chunk = 2;
        for (i = 0, j = nodes.length; i < j; i += chunk) {
            pair = nodes.slice(i, i + chunk);
            pairs.push({ key: pair[0], value: pair[1] });
        }
        return pairs;
    };
    ArrayNode.prototype.compileArguments = function (compiler, withKeys) {
        if (withKeys === void 0) { withKeys = true; }
        var first = true;
        for (var _i = 0, _a = this.getKeyValuePairs(); _i < _a.length; _i++) {
            var pair = _a[_i];
            if (!first) {
                compiler.raw(', ');
            }
            first = false;
            if (withKeys) {
                compiler.compile(pair.key)
                    .raw(': ');
            }
            compiler.compile(pair.value);
        }
    };
    return ArrayNode;
}(Node));
export default ArrayNode;
