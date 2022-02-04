export const validateSize = value => {
    if ( !Number.isInteger(value) ) {
        throw new Error('Invalid LRU cache size: expect integer number.');
    }
};