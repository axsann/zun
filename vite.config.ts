import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import watchAndRun from 'vite-plugin-watch-and-run';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://www.kitql.dev/docs/setup/03_vite-plugin-watch-and-run
    watchAndRun([
      {
        name: 'gen',
        watchKind: ['add', 'change', 'unlink'],
        watch: path.resolve('src/assets/json/**/*.(json|js)'),
        run: 'npm run gen',
        delay: 300,
      },
    ]),
  ],
});
