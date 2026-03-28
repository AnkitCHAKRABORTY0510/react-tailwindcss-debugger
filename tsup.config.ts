import { defineConfig, type Options } from 'tsup';

const commonConfig: Options = {
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false, // Don't clean between sub-builds
  minify: true,
  external: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  outDir: 'dist',
  treeshake: true,
  target: 'esnext',
};

export default defineConfig([
  // CLI Build
  {
    ...commonConfig,
    entry: { cli: 'bin/cli.ts' },
    banner: {
      js: '#!/usr/bin/env node',
    },
  },
  // Main Library Build
  {
    ...commonConfig,
    entry: { index: 'src/index.tsx' },
    banner: {
      js: '"use client";',
    },
  },
  // Babel Plugin Build
  {
    ...commonConfig,
    entry: { babel: 'src/babel/babel-plugin-rve.ts' },
  },
]);
