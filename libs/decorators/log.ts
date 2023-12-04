/**
 * Add logging for cache operations.
 */
function log() {
    return function (originalMethod: any, _context: ClassMethodDecoratorContext) {
        function replacementMethod(this: any, key: any, value: any) {
            // @todo: implement
        }

        return replacementMethod;
    };
}


export default log;