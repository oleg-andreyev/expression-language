import AbstractProvider from "./AbstractProvider";
import ExpressionFunction from "../ExpressionFunction";
export default class DateProvider extends AbstractProvider {
    getFunctions(): ExpressionFunction[];
}
