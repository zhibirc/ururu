interface IRRCache {
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
     * For RR cache, by definition, capacity is a required restriction,
     * without it becomes almost meaningless, so this option is mandatory.
     */
    capacity: number;
};


export {
    IRRCache,
    TConfigOptions
};