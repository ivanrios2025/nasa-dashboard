type CacheEntry = { data: any; expires: number };

export class SimpleCache {
  private cache = new Map<string, CacheEntry>();

  set(key: string, data: any, ttlSec = 300) {
    this.cache.set(key, { data, expires: Date.now() + ttlSec * 1000 });
  }

  get(key: string) {
    const entry = this.cache.get(key);
    if (!entry || Date.now() > entry.expires) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  getStats() {
    return { size: this.cache.size, keys: [...this.cache.keys()] };
  }
}
