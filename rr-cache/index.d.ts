type TStats = {
    size: number;
    capacity: number;
    locked: boolean;
};
interface IRRCache {
    get stats(): TStats;
    set locked(state: boolean);
    read: (key: any) => any;
    add: (key: any, value: any) => void;
    has: (key: any) => boolean;
    remove: (key: any) => void;
    clear: () => void;
}
type TConfigOptions = {
    /**
     * Capacity means how many items can be stored at the same time in cache.
     * For RR cache, by definition, capacity is a required restriction,
     * without it becomes almost meaningless, so this option is mandatory.
     */
    capacity: number;
};
declare class RRCache implements IRRCache {
    #private;
    constructor(options: TConfigOptions);
    get stats(): {
        size: number;
        capacity: number;
        locked: boolean;
    };
    set locked(state: boolean);
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
