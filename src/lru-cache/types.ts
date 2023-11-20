interface ILruCache {
    get size(): number,
    set capacity(value: number),
    read: (key: any) => any,
    store: (key: any, value: any) => void,
    has: (key: any) => boolean,
    remove: (key: any) => void,
    clear: () => void
};

type TConfigOptions = {
    capacity?: number,
    // detect low memory situation and act accordingly: clear existing record and prevent storing new ones
    checkLowMemory?: boolean
};


export {
    ILruCache,
    TConfigOptions
};