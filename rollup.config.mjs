import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "@tailwindcss/postcss";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.cjs.js",
                format: "cjs",
                exports: "named",
                sourcemap: false,
            },
            {
                file: "dist/index.esm.js",
                format: "es",
                sourcemap: false,
            },
        ],
        external: ["react", "react-dom"], 
        plugins: [
            peerDepsExternal(),
            resolve(),
            typescript({
                tsconfig: "./tsconfig.json",
                declaration: true,
                declarationDir: "dist",
				sourceMap: false,
				declarationMap: false,
                exclude: ["**/__tests__", "**/*.test.ts"]
            }),
            postcss({
                plugins: [
                    tailwindcss(), 
                ],
                extract: "index.css",
                minimize: true,
                sourceMap: false,
            }),
            terser({
				sourceMap: false,
			}),
        ],
    },
];