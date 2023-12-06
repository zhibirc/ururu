const MAX_8BIT_UINT  = (1 << 8) - 1;
const MAX_16BIT_UINT = (1 << 16) - 1;
const MAX_32BIT_UINT = (1 << 30) * 4 - 1;

function getTypedArray (n: number) {
    switch (true) {
        case n - 1 <= MAX_8BIT_UINT:
            return new Uint8Array(n);
        case n - 1 <= MAX_16BIT_UINT:
            return new Uint16Array(n);
        case n - 1 <= MAX_32BIT_UINT:
            return new Uint32Array(n);
        default:
            return new Array(n);
    }
}


export default getTypedArray;