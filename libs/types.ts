type TStats = {
    // represent number of cache entries
    size: number;
    // represent value of cache capacity
    capacity: number;
    // represent if cache is locked currently
    locked: boolean;
    // measures how effective a cache is at fulfilling requests
    hitRatio: number;
    // object describing the memory usage of the process
    memoryUsage: Record<string, number>;
    // @todo: may contain other props like cache misses, etc.
}

type TConfigOptions = {
    /**
     * Capacity means how many items can be stored at the same time in cache.
     */
    capacity: number;
}

interface ICache {
    // get cache statistics
    get stats(): TStats;
    // set lock state, if locked cache isn't growing
    set lock(state: boolean);
    // read value from cache by its key
    read: (key: any) => any;
    // add value to cache by corresponding key
    add: (key: any, value: any) => void;
    // check if cache contains value by given key
    has: (key: any) => boolean;
    // remove value from cache by associated key
    remove: (key: any) => void;
    // clear cache by removing all stored data and release all auxiliary resources
    clear: () => void;
}


export {
    TStats,
    TConfigOptions,
    ICache
};