import {is_scalar} from "../lib/is-scalar";
import {addcslashes} from "../lib/addcslashes";

type Nodes = Partial<Record<string | number, Node>>;

export default class Node {
    name: string;
    type: string;
    nodes: Nodes;
    attributes: any;

    constructor(nodes: Nodes, attributes: any = {}) {
        this.name = 'Node';
        this.nodes = nodes;
        this.attributes = attributes;
    }

    toString() {
        const attributes = [];
        for (const name of Object.keys(this.attributes)) {
            let oneAttribute = 'null';
            if (this.attributes[name]) {
                oneAttribute = this.attributes[name].toString();
            }
            attributes.push(`${name}: '${oneAttribute}'`);
        }

        const repr = [this.name + "(" + attributes.join(", ")];

        // @ts-ignore
        if (this.nodes.length > 0) {
            for (const node of Object.values(this.nodes)) {
                const lines = node.toString().split("\n");
                for (const line of lines) {
                    repr.push("    " + line);
                }
            }
            repr.push(")");
        } else {
            repr[0] += ")";
        }

        return repr.join("\n");
    }


    compile(compiler) {
        for (const node of Object.values(this.nodes)) {
            node.compile(compiler);
        }
    }

    evaluate(functions, values): any {
        const results = [];
        for (const node of Object.values(this.nodes)) {
            results.push(node.evaluate(functions, values));
        }

        return results;
    }

    toArray(): any[] {
        throw new Error(`Dumping a "${this.name}" instance is not supported yet.`);
    }

    dump() {
        let dump = "";

        for (const v of this.toArray()) {
            dump += is_scalar(v) ? v : v.dump();
        }

        return dump;
    }

    dumpString(value) {
        return `"${addcslashes(value, "\0\t\"\\")}"`;
    }

    isHash(value) {
        let expectedKey = 0;
        let key: string|number;

        for (key of Object.keys(value)) {
            key = parseInt(key);
            if (key !== expectedKey++) {
                return true;
            }
        }
        return false;
    }
}