import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript';
import buble from 'rollup-plugin-buble';
import pkg from './package.json';

var external = Object.keys(pkg.dependencies).concat('path');

export default {
    input: 'src/index.ts',
    plugins: [
        json(),
        typescript(),
        buble()
    ],
    external,
    output: [{
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        }
    ]
};