(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExpressionFunction = /** @class */ (function () {
        function ExpressionFunction(name, compiler, evaluator) {
            this.name = name;
            this.compiler = compiler;
            this.evaluator = evaluator;
        }
        ExpressionFunction.prototype.getName = function () {
            return this.name;
        };
        ExpressionFunction.prototype.getCompiler = function () {
            return this.compiler;
        };
        ExpressionFunction.prototype.getEvaluator = function () {
            return this.evaluator;
        };
        return ExpressionFunction;
    }());
    exports.default = ExpressionFunction;
});
