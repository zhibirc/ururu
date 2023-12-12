import { ICache } from '../libs/types.js';
declare class FifoCache implements ICache {
    #private;
    constructor(capacity: number);
    get stats(): {
        size: number;
        capacity: number;
        locked: boolean;
        hitRatio: number;
        memoryUsage: {
            rss: number;
            heapTotal: number;
            heapUsed: number;
            external: number;
            arrayBuffers: number;
            freeTotalRatio: number;
        };
    };
    set lock(state: boolean);
    /**
     * Read value stored in cache by assosiated key.
     * @param {*} key - cache record's key
     * @return {*|void} record's value retrieved by key or undefined if record is absent
     */
    read(key: any): any;
    add(key: any, value: any): void;
    /**
     * Check if record by given key exists in cache.
     * @param {*} key - cache record's key
     * @return {boolean} return true if record is in the cache
     */
    has(key: any): boolean;
    /**
     * Remove an item from the cache.
     * @param {*} key - cache record's key
     * @return {void}
     */
    remove(key: any): void;
    /**
     * Remove all items from the cache and clear internal structures.
     * @return {void}
     */
    clear(): void;
}
export default FifoCache;
