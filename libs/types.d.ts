type TStats = {
    size: number;
    capacity: number;
    locked: boolean;
    hitRatio: number;
};
type TConfigOptions = {
    /**
     * Capacity means how many items can be stored at the same time in cache.
     */
    capacity: number;
};
interface ICache {
    get stats(): TStats;
    set lock(state: boolean);
    read: (key: any) => any;
    add: (key: any, value: any) => void;
    has: (key: any) => boolean;
    remove: (key: any) => void;
    clear: () => void;
}
export { TStats, TConfigOptions, ICache };
