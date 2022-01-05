import ExpressionFunction from "../ExpressionFunction";
import AbstractProvider from "./AbstractProvider";
export default class StringProvider extends AbstractProvider {
    getFunctions(): ExpressionFunction[];
}
