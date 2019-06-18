import { name } from "../package.json";
import { createFilter } from "rollup-pluginutils";

const BUILDIN_FORMAT = {
    json(code) {
        return new Function("define", "return " + code)(func =>
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
                    key =>
                        filter(key) &&
                        (bundles[key].code = outputOptions.transform(
                            bundles[key].code
                        ))
                );
            }
        },
        outputOptions(outputOptions) {
            if (Object.keys(BUILDIN_FORMAT).includes(outputOptions.format)) {
                outputOptions.transform = BUILDIN_FORMAT[outputOptions.format];
                outputOptions.format = "amd";
                return outputOptions;
            } else if (outputOptions.format instanceof Function) {
                outputOptions.transform = outputOptions.format;
                outputOptions.format = "amd";
            }
            return outputOptions;
        }
    };
}
