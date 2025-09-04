export class SimpleCache {
    cache = new Map();
    set(key, data, ttlSec = 300) {
        this.cache.set(key, { data, expires: Date.now() + ttlSec * 1000 });
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry || Date.now() > entry.expires) {
            this.cache.delete(key);
            return null;
        }
        return entry.data;
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    getStats() {
        return { size: this.cache.size, keys: [...this.cache.keys()] };
    }
}
//# sourceMappingURL=SimpleCache.js.map