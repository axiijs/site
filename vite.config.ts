import {resolve} from "path";
import {fileURLToPath, URL} from "url";

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
    },
  },
  resolve: {
    alias: {
      // 'axii': fileURLToPath(new URL('../axii/src/index.ts', import.meta.url)),
      // 'data0': fileURLToPath(new URL('../data0/src/index.ts', import.meta.url)),
    }
  },
  define: {
    __DEV__: false,
  },
}
