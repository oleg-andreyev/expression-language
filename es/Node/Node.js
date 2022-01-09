import { is_scalar } from "../lib/is-scalar";
import { addcslashes } from "../lib/addcslashes";
var Node = /** @class */ (function () {
    function Node(nodes, attributes) {
        if (attributes === void 0) { attributes = {}; }
        this.name = 'Node';
        this.nodes = nodes;
        this.attributes = attributes;
    }
    Node.prototype.toString = function () {
        var attributes = [];
        for (var _i = 0, _a = Object.keys(this.attributes); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var oneAttribute = 'null';
            if (this.attributes[name_1]) {
                oneAttribute = this.attributes[name_1].toString();
            }
            attributes.push("".concat(name_1, ": '").concat(oneAttribute, "'"));
        }
        var repr = [this.name + "(" + attributes.join(", ")];
        // @ts-ignore
        if (this.nodes.length > 0) {
            for (var _b = 0, _c = Object.values(this.nodes); _b < _c.length; _b++) {
                var node = _c[_b];
                var lines = node.toString().split("\n");
                for (var _d = 0, lines_1 = lines; _d < lines_1.length; _d++) {
                    var line = lines_1[_d];
                    repr.push("    " + line);
                }
            }
            repr.push(")");
        }
        else {
            repr[0] += ")";
        }
        return repr.join("\n");
    };
    Node.prototype.compile = function (compiler) {
        for (var _i = 0, _a = Object.values(this.nodes); _i < _a.length; _i++) {
            var node = _a[_i];
            node.compile(compiler);
        }
    };
    Node.prototype.evaluate = function (functions, values) {
        var results = [];
        for (var _i = 0, _a = Object.values(this.nodes); _i < _a.length; _i++) {
            var node = _a[_i];
            results.push(node.evaluate(functions, values));
        }
        return results;
    };
    Node.prototype.toArray = function () {
        throw new Error("Dumping a \"".concat(this.name, "\" instance is not supported yet."));
    };
    Node.prototype.dump = function () {
        var dump = "";
        for (var _i = 0, _a = this.toArray(); _i < _a.length; _i++) {
            var v = _a[_i];
            dump += is_scalar(v) ? v : v.dump();
        }
        return dump;
    };
    Node.prototype.dumpString = function (value) {
        return "\"".concat(addcslashes(value, "\0\t\"\\"), "\"");
    };
    Node.prototype.isHash = function (value) {
        var expectedKey = 0;
        var key;
        for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
            key = _a[_i];
            key = parseInt(key);
            if (key !== expectedKey++) {
                return true;
            }
        }
        return false;
    };
    return Node;
}());
export default Node;
