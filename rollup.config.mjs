import typescript from "rollup-plugin-typescript2";

export default {
    input: "src/index.ts",
    external: [
        'moment',
        'ip-address',
        'deepmerge',
        'axios',
        'store2',
        'camel-case',
        'uuid'
    ],
    output: [
        {
            file: "dist/zemit-sdk.cjs.js",
            format: "cjs",
        },
        {
            file: "dist/zemit-sdk.es.js",
            format: "es",
        },
        {
            file: "dist/zemit-sdk.umd.js",
            format: "umd",
            name: "Zemit",
            globals: {
                'moment': 'moment',
                'ip-address': 'IpAddress',
                'deepmerge': 'deepmerge',
                'axios': 'axios',
                'store2': 'store',
                'camel-case': 'camelCase',
                'uuid': 'uuid'
            }
        },
        {
            file: "dist/zemit-sdk.iife.js",
            format: "iife",
            name: 'Zemit',
            globals: {
                'moment': 'moment',
                'ip-address': 'IpAddress',
                'deepmerge': 'deepmerge',
                'axios': 'axios',
                'store2': 'store',
                'camel-case': 'camelCase',
                'uuid': 'uuid'
            }
        },
    ],
    plugins: [
        typescript(),
    ],
};
