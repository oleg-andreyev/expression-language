import { CacheItem } from "./CacheItem";
export default class ArrayAdapter {
    private readonly defaultLifetime;
    private values;
    private expiries;
    constructor(defaultLifetime?: number);
    createCacheItem(key: any, value: any, isHit: any): CacheItem;
    get(key: any, callback: any, beta?: any, metadata?: any): null;
    getItem(key: any): CacheItem;
    getItems(keys: any): any[];
    deleteItems(keys: any): boolean;
    save(item: any): boolean;
    saveDeferred(item: any): boolean;
    commit(): boolean;
    delete(key: any): boolean;
    getValues(): {};
    hasItem(key: any): boolean;
    clear(): boolean;
    deleteItem(key: any): boolean;
    reset(): void;
    generateItems(keys: any, now: any, f: any): any[];
}
