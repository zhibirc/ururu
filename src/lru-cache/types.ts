interface ILruCache {
    get size(): number;
    set capacity(value: number);
    read: (key: any) => any;
    store: (key: any, value: any) => void;
    has: (key: any) => boolean;
    remove: (key: any) => void;
    clear: () => void;
};

type TConfigOptions = {
    /**
     * Capacity means how many items can be stored at the same time in cache.
     * For LRU cache, by definition, capacity is a required restriction,
     * without it becomes almost meaningless, so this option is mandatory.
     */
    capacity: number;
    /**
     * Detect low memory situation and act accordingly: clear cache to free up memory
     * and prevent storing new records temporarily.
     * If such situation is just hypothetical, it's better to not enable this feature
     * to not waste system resources.
     */
    checkLowMemory?: boolean;
};


export {
    ILruCache,
    TConfigOptions
};