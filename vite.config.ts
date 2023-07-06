import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react-swc'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Required because the CatalystClient tries to access it
  define: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'process.env': {}
  },
  ...(command === 'build'
    ? {
        optimizeDeps: {
          esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
              global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
              NodeGlobalsPolyfillPlugin({
                buffer: true,
                process: true
              }),
              NodeModulesPolyfillPlugin()
            ]
          }
        },
        build: {
          commonjsOptions: {
            transformMixedEsModules: true
          },
          rollupOptions: {
            plugins: [rollupNodePolyFill()]
          }
        }
      }
    : undefined)
}))
