import { TConfigOptions, ICache } from '../libs/types.js';
declare class RRCache implements ICache {
    #private;
    constructor(options: TConfigOptions);
    get stats(): {
        size: number;
        capacity: number;
        locked: boolean;
        hitRatio: number;
    };
    set lock(state: boolean);
    /**
     * Read value stored in cache by assosiated key.
     * @param {*} key - cache record's key
     * @return {*|null} record's value retrieved by key or null if record is absent
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
     * Remove all items from the cache.
     * @return {void}
     */
    clear(): void;
}
export default RRCache;
