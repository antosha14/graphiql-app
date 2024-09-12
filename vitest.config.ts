import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
    coverage: {
      exclude: [
        '**/app/**',
        '**/utils/**',
        '**/*.spec.js',
        '**/i18nConfig.ts',
        '**/Layout.tsx',
        '**/middleware.ts',
        '**/next-env.d.ts',
        '**/next.config.mjs',
        '**/*.test.js',
        '**/contexts/**',
        '**/models/**',
        'vitest.config.ts',
        'next.config.js',
        '.next',
        'dist',
        '**/*.test.{js,jsx,ts,tsx}',
      ],
    },
    alias: {
      '@components': '/src/components',
      '@contexts': '/src/contexts',
      '@utils': '/src/utils',
      '@models': '/src/models',
      '@hooks': '/src/hooks',
      '@styles': '/src/styles',
      '@public': '/src/public',
      '@test': '/src/test',
      '@app': '/src/app',
    },
  },
});
