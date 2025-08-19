
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'esnext',
    ssrManifest: true,
    ssrEmitAssets: true,
    rollupOptions: {
      // 仅为 client 构建声明入口，不要把 server 入口放进 client 包
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        format: 'esm',
        // SSR 构建时，入口名通常是 entry-server，这里将其输出为根目录下的 entry-server.js
        entryFileNames: (chunkInfo) =>
          chunkInfo.name === 'entry-server' ? 'entry-server.js' : 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        // 使用 extname 以包含点号，例如 .css/.svg
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  ssr: {
    // 仅对需要 SSR 预构建为 ESM 的依赖进行处理
    noExternal: ['tdesign-vue-next', 'tdesign-icons-vue-next']
  }
});
