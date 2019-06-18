import { name } from "../package.json";
import { createFilter } from "rollup-pluginutils";

const BUILDIN_FORMAT = {
    raw(bundle) {
        return new Function("define", "return " + bundle.code)(func => {
            return func.toString();
        });
    },
    json(bundle) {
        return new Function("define", "return " + bundle.code)(func =>
            JSON.stringify(func(), null, 4)
        );
    }
};

interface Options {
    include?: Array<string | RegExp> | string | RegExp | null;
    exclude?: Array<string | RegExp> | string | RegExp | null;
}

export default function(options: Options = {}) {
    const filter = createFilter(options.include, options.exclude);
    return {
        name,
        generateBundle(outputOptions, bundles) {
            if (
                outputOptions.transform &&
                outputOptions.transform instanceof Function
            ) {
                Object.keys(bundles).forEach(
                    key => filter(key) && outputOptions.transform(bundles[key])
                );
            }
        },
        outputOptions(outputOptions) {
            if (Object.keys(BUILDIN_FORMAT).includes(outputOptions.format)) {
                outputOptions.format = "amd";
                outputOptions.transform = BUILDIN_FORMAT[outputOptions.format];
                return outputOptions;
            } else if (outputOptions.format instanceof Function) {
                outputOptions.format = "amd";
                outputOptions.transform = outputOptions.format;
            }
            return outputOptions;
        }
    };
}
