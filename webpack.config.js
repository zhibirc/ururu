import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build'),
        library: {
            type: 'module',
        }
    },
    experiments: {
        outputModule: true,
    }
};
