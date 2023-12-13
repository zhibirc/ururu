class CuckooFilter {
    constructor(capacity: number) {
        if (!Number.isInteger(capacity) || capacity <= 0) {
            throw new Error('invalid "capacity": positive integer expected');
        }
    }

    set(key: string) {}

    get(key: string) {}
}


export default CuckooFilter;