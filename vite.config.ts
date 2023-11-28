import { defineConfig } from 'vite';
import dts from "vite-plugin-dts"
import { resolve } from 'path'
import { libInjectCss } from "vite-plugin-lib-inject-css"
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: "lib", insertTypesEntry: true }),
    libInjectCss()
  ],
  build: {
    copyPublicDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'UiKit',
      fileName: 'ui-kit',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
        },
      },
    },
  },
})
