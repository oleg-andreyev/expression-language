import ExpressionFunction from "../ExpressionFunction";
import AbstractProvider from "./AbstractProvider";
export default class ArrayProvider extends AbstractProvider {
    getFunctions(): ExpressionFunction[];
}
export declare const implodeFn: ExpressionFunction;
export declare const countFn: ExpressionFunction;
export declare const arrayIntersectFn: ExpressionFunction;
