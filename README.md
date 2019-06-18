rollup-plugin-output
====

![](https://img.shields.io/npm/v/rollup-plugin-output.svg?style=flat)

Custom output format for rollup.

## Installation

```shell
$ npm install --save-dev rollup-plugin-output
```

Or

```shell
$ yarn add -D rollup-plugin-output
```

## Example

### Generate JSON format file

```ts
// src/manifest.ts
import * as pkg from "../package.json";

export default {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    app: {
        background: {
            scripts: ["background.js"]
        }
    }
};
```

```js
// rollup.config.js
import json from "rollup-plugin-json";
import output from "rollup-plugin-output";

const manifest = {
    input: "src/manifest.ts",
    output: {
        file: "dist/manifest.json",
        format: "json"
    },
    plugins: [json(), output()]
};

export default [manifest];
```

```json
// dist/manifest.json
{
    "name": "shadowsocks-chromeos",
    "description": "",
    "version": "1.0.0",
    "app": {
        "background": {
            "scripts": [
                "background.js"
            ]
        }
    }
}
```

### Advanced Config(Custom output function)

```js
// rollup.config.js
const manifest = {
    input: "src/manifest.ts",
    output: {
        file: "dist/manifest.txt",
        format (code) {
            return "Hello World";
        }
    },
    plugins: [json(), output()]
};
```

```js
// dist/manifest.txt
Hello World
```