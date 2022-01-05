import ArrayNode from "./ArrayNode";

export default class ArgumentsNode extends ArrayNode {
    constructor() {
        super();
        this.name = "ArgumentsNode";
    }

    compile(compiler) {
        this.compileArguments(compiler, false);
    }

    toArray() {
        const array = [];
        for (const pair of this.getKeyValuePairs()) {
            array.push(pair.value);
            array.push(", ");
        }
        array.pop();

        return array;
    }
}