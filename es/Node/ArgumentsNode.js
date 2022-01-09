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
        define(["require", "exports", "./ArrayNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArrayNode_1 = require("./ArrayNode");
    var ArgumentsNode = /** @class */ (function (_super) {
        __extends(ArgumentsNode, _super);
        function ArgumentsNode() {
            var _this = _super.call(this) || this;
            _this.name = "ArgumentsNode";
            return _this;
        }
        ArgumentsNode.prototype.compile = function (compiler) {
            this.compileArguments(compiler, false);
        };
        ArgumentsNode.prototype.toArray = function () {
            var array = [];
            for (var _i = 0, _a = this.getKeyValuePairs(); _i < _a.length; _i++) {
                var pair = _a[_i];
                array.push(pair.value);
                array.push(", ");
            }
            array.pop();
            return array;
        };
        return ArgumentsNode;
    }(ArrayNode_1.default));
    exports.default = ArgumentsNode;
});
