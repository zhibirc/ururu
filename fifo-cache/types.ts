interface IFifoCache {
    get size(): number;
    set capacity(value: number);
    read: (key: any) => any;
    store: (key: any, value: any) => void;
    has: (key: any) => boolean;
    clear: () => void;
};

type TConfigOptions = {
    /**
     * Capacity means how many items can be stored at the same time in cache.
     * For FIFO cache, by definition, capacity is a required restriction,
     * without it becomes almost meaningless, so this option is mandatory.
     */
    capacity: number;
};

type TNode = {
    data: {
        key: any,
        value: any
    };
    next?: TNode;
};


export {
    IFifoCache,
    TConfigOptions,
    TNode
};