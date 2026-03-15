import react from '@vitejs/plugin-react';
import { defineConfig, ConfigEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
  return defineConfig({
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      react(), // https://blog.csdn.net/XH_jing/article/details/150554654
      viteMockServe({
        mockPath: 'mock',
        localEnabled: true,
        prodEnabled: true,
        watchFiles: true,
        logger: true,
        injectCode: `
            import { setupProdMockServer } from './mockProdServer';
            setupProdMockServer();
        `,
      }),
    ],
  });
};
