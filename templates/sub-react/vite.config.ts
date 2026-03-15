import react from '@vitejs/plugin-react';
import { defineConfig, ConfigEnv } from 'vite';
import qiankun from 'vite-plugin-qiankun-lite';

import { name } from './package.json';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
  return defineConfig({
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      cors: true, // 允许跨域
      origin: '*', // 允许跨域
    },
    plugins: [
      react(),
      qiankun({ name: name, sandbox: !!process.env.VITE_SANDBOX }),
    ],
  });
};
