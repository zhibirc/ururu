type TStats = {
    // get number of cache entries
    size: number;
    // get current value of cache capacity
    capacity: number;
    // @todo: may contain other props like cache misses, etc.
};

interface IRRCache {
    // get cache statistics
    get stats(): TStats;
    // set new capacity value
    set capacity(value: number);
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
};

type TConfigOptions = {
    /**
     * Capacity means how many items can be stored at the same time in cache.
     * For RR cache, by definition, capacity is a required restriction,
     * without it becomes almost meaningless, so this option is mandatory.
     */
    capacity: number;
};


export {
    IRRCache,
    TConfigOptions
};