import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import packageJson from "./package.json" assert { type: "json" };
import { getFiles } from "./scripts/buildUtils";

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

export default [
  {
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
        sourceMap: false,
        inlineSources: false,
      }),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
      postcss({
        plugins: [autoprefixer],
        modules: true,
        extract: false,
        minimize: true,
        use: ["sass"],
      }),
      terser({
        format: {
          comments: false,
        },
        compress: true,
      }),
      visualizer({
        open: true,
        openOptions: { wait: true, background: false },
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    external: [
      "react/jsx-runtime",
      ...Object.keys(packageJson.peerDependencies || {}),
    ],
  },
];
