import path from "path";

export default {
    base: "/TechTest",
    root: path.resolve(__dirname, ''),
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        }
    }
}