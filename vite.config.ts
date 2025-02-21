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
      // 'data0-router': fileURLToPath(new URL('../axii-util/packages/router/src/index.ts', import.meta.url)),
      // 'data0-worker': fileURLToPath(new URL('../axii-util/packages/worker/src/index.ts', import.meta.url)),
      // 'data0-action': fileURLToPath(new URL('../axii-util/packages/action/src/index.ts', import.meta.url)),
      // 'router0': fileURLToPath(new URL('../router/src/index.ts', import.meta.url)),
      // 'axii': fileURLToPath(new URL('../axii/src/index.ts', import.meta.url)),
      // 'data0': fileURLToPath(new URL('../data0/src/index.ts', import.meta.url)),
      // 'statemachine0': fileURLToPath(new URL('../statemachine/src/index.ts', import.meta.url)),
    },
    dedupe: ['data0', 'axii']
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
    },
    watch: {
      include: ['docs/**/*.ts', 'docs/**/*.tsx']
    }
  }
}
