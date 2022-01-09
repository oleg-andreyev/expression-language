(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ExpressionLanguage", "./Lexer", "./Parser", "./ExpressionFunction", "./Compiler", "./Cache/ArrayAdapter", "./Provider/BasicProvider", "./Provider/StringProvider", "./Provider/ArrayProvider", "./Provider/DateProvider", "./Node/ArgumentsNode", "./Node/ArrayNode", "./Node/BinaryNode", "./Node/ConditionalNode", "./Node/ConstantNode", "./Node/FunctionNode", "./Node/GetAttrNode", "./Node/NameNode", "./Node/Node", "./Node/UnaryNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DateProvider = exports.ArrayProvider = exports.StringProvider = exports.BasicProvider = exports.ArrayAdapter = exports.Compiler = exports.ExpressionFunction = exports.tokenize = exports.Parser = exports.ExpressionLanguage = exports.UnaryNode = exports.Node = exports.NameNode = exports.GetAttrNode = exports.FunctionNode = exports.ConstantNode = exports.ConditionalNode = exports.BinaryNode = exports.ArrayNode = exports.ArgumentsNode = void 0;
    var ExpressionLanguage_1 = require("./ExpressionLanguage");
    exports.ExpressionLanguage = ExpressionLanguage_1.default;
    var Lexer_1 = require("./Lexer");
    Object.defineProperty(exports, "tokenize", { enumerable: true, get: function () { return Lexer_1.tokenize; } });
    var Parser_1 = require("./Parser");
    exports.Parser = Parser_1.default;
    var ExpressionFunction_1 = require("./ExpressionFunction");
    exports.ExpressionFunction = ExpressionFunction_1.default;
    var Compiler_1 = require("./Compiler");
    exports.Compiler = Compiler_1.default;
    var ArrayAdapter_1 = require("./Cache/ArrayAdapter");
    exports.ArrayAdapter = ArrayAdapter_1.default;
    var BasicProvider_1 = require("./Provider/BasicProvider");
    exports.BasicProvider = BasicProvider_1.default;
    var StringProvider_1 = require("./Provider/StringProvider");
    exports.StringProvider = StringProvider_1.default;
    var ArrayProvider_1 = require("./Provider/ArrayProvider");
    exports.ArrayProvider = ArrayProvider_1.default;
    var DateProvider_1 = require("./Provider/DateProvider");
    exports.DateProvider = DateProvider_1.default;
    var ArgumentsNode_1 = require("./Node/ArgumentsNode");
    exports.ArgumentsNode = ArgumentsNode_1.default;
    var ArrayNode_1 = require("./Node/ArrayNode");
    exports.ArrayNode = ArrayNode_1.default;
    var BinaryNode_1 = require("./Node/BinaryNode");
    exports.BinaryNode = BinaryNode_1.default;
    var ConditionalNode_1 = require("./Node/ConditionalNode");
    exports.ConditionalNode = ConditionalNode_1.default;
    var ConstantNode_1 = require("./Node/ConstantNode");
    exports.ConstantNode = ConstantNode_1.default;
    var FunctionNode_1 = require("./Node/FunctionNode");
    exports.FunctionNode = FunctionNode_1.default;
    var GetAttrNode_1 = require("./Node/GetAttrNode");
    exports.GetAttrNode = GetAttrNode_1.default;
    var NameNode_1 = require("./Node/NameNode");
    exports.NameNode = NameNode_1.default;
    var Node_1 = require("./Node/Node");
    exports.Node = Node_1.default;
    var UnaryNode_1 = require("./Node/UnaryNode");
    exports.UnaryNode = UnaryNode_1.default;
    exports.default = ExpressionLanguage_1.default;
});
