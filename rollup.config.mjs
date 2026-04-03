import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: "dist/index.cjs.js",
				format: "cjs",
				exports: "named",
				sourcemap: true,
			},
			{
				file: "dist/index.esm.js",
				format: "es",
				sourcemap: true,
			},
		],
		external: ["react", "react-dom"],
		plugins: [
			external(),
			resolve(),
			typescript({
				tsconfig: "./tsconfig.json",
				declaration: true,
				declarationDir: "dist",
			}),
			postcss({
				extract: "index.css",
				minimize: true,
				inject: false,
			}),
			terser(),
		],
	},
];
