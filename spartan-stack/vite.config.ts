/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: import.meta.dirname,
    cacheDir: `../node_modules/.vite`,
    build: {
      outDir: '../dist/./spartan-stack/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    server: {
      fs: {
        allow: ['.', '..'],
      },
    },
    resolve: {
      alias: {
        '@spartan-ng/helm/button': resolve(__dirname, '../libs/ui/button/src/index.ts'),
        '@spartan-ng/helm/utils': resolve(__dirname, '../libs/ui/utils/src/index.ts'),
        '@spartan-ng/helm/radio-group': resolve(__dirname, '../libs/ui/radio-group/src/index.ts'),
      },
    },
    plugins: [
      analog(),
      viteTsConfigPaths(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
  };
});
