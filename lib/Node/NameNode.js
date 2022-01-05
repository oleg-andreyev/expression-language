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
var NameNode = /** @class */ (function (_super) {
    __extends(NameNode, _super);
    function NameNode(name) {
        var _this = _super.call(this, [], { name: name }) || this;
        _this.name = 'NameNode';
        return _this;
    }
    NameNode.prototype.compile = function (compiler) {
        compiler.raw(this.attributes.name);
    };
    NameNode.prototype.evaluate = function (functions, values) {
        return values[this.attributes.name];
    };
    NameNode.prototype.toArray = function () {
        return [this.attributes.name];
    };
    return NameNode;
}(Node_1.default));
exports.default = NameNode;
