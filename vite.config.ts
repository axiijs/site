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
      'axii-router': fileURLToPath(new URL('../axii-util/packages/router/src/router.ts', import.meta.url)),
      'axii': fileURLToPath(new URL('../axii/src/index.ts', import.meta.url)),
      'data0': fileURLToPath(new URL('../data0/src/index.ts', import.meta.url)),
    }
  },
  define: {
    __DEV__: false,
  },
  server: {
    proxy: {
      '/playground/.*': {
        target: 'http://127.0.0.1:5173',
        changeOrigin:false,
        rewrite: (path:string) => {
          console.log(path)
          return 'playground.html'
        }
      }
    }
  }
}
