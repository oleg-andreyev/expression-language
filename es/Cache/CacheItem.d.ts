export declare class CacheItem {
    static METADATA_EXPIRY_OFFSET: number;
    static RESERVED_CHARACTERS: string[];
    key: string;
    value: null;
    isHit: boolean;
    defaultLifetime: number;
    expiry: number | null;
    private metadata;
    private newMetadata;
    private innerItem;
    private poolHash;
    private isTaggable;
    constructor();
    getKey(): string;
    get(): null;
    set(value: any): this;
    expiresAt(expiration: any): this;
    expiresAfter(time: any): this;
    tag(tags: any): this;
    getMetadata(): {};
    static validateKey(key: any): string;
}
