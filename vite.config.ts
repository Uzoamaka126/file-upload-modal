/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import Jsx from '@vitejs/plugin-vue-jsx';
import tsconfigPaths from 'vite-tsconfig-paths'
import path from "path";
// import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Jsx(), tsconfigPaths()],
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
  build: {
    cssCodeSplit: true,
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: 'FileUploadComponent',
      fileName: 'file-upload-component'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  }
})
