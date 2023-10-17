import path from "path";

export default {
    base: "/Didlydoo",
    root: path.resolve(__dirname, ''),
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    build: {
        target: 'esnext'
    }
}