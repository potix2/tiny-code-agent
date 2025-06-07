import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  platform: 'node',
  target: 'node20',
  banner: {
    js: '#!/usr/bin/env node'
  },
  external: [
    'commander',
    'events'
  ]
});
