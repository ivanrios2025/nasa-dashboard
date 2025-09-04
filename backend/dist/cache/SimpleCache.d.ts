export declare class SimpleCache {
    private cache;
    set(key: string, data: any, ttlSec?: number): void;
    get(key: string): any;
    delete(key: string): void;
    clear(): void;
    getStats(): {
        size: number;
        keys: string[];
    };
}
//# sourceMappingURL=SimpleCache.d.ts.map