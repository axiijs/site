import { resolve } from 'path'

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  define: {
    __DEV__: false,
  },
  // assetsInclude: ['readme_cn.json', 'readme_en.json'],
  build: {
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        // reference: resolve(__dirname, 'reference.html'),
        playground: resolve(__dirname, 'playground.html'),
      },
    },
    resolve: {
      dedupe: ['data0', 'axii']
    }
  },

}
