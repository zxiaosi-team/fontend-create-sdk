import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  minify: true,
  platform: 'node',
  target: 'node16',
  format: 'cjs',
  fixedExtension: false,
});
