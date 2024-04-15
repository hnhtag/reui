import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import { getFiles } from "./scripts/buildUtils";
import terser from "@rollup/plugin-terser";

const packageJson = require("./package.json");
const extensions = [".js", ".ts", ".jsx", ".tsx"];
const excludeExtensions = [
  "test.js",
  "test.ts",
  "test.jsx",
  "test.tsx",
  "stories.js",
  "stories.ts",
  "stories.jsx",
  "stories.tsx",
];

export default {
  input: [
    "./src/index.ts",
    ...getFiles("./src/components", extensions, excludeExtensions),
  ],
  output: {
    dir: "build",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    postcss({
      plugins: [autoprefixer],
      modules: true,
    }),
    terser(),
  ],
  external: Object.keys(packageJson.peerDependencies || {}),
};
