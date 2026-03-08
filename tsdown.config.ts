import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/cli.ts',
  minify: true,
  platform: 'node',
  target: 'node16',
  fixedExtension: false,
});
