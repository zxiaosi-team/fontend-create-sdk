import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, ConfigEnv } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import { viteMockServe } from 'vite-plugin-mock';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
  // 环境变量文件夹
  const envDir = resolve(__dirname, 'env');

  return defineConfig({
    envDir: envDir,
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
      // 配合 index.html 中的预加载资源使用
      viteExternalsPlugin({
        react: 'React',

        // 开发环境不排除 react-dom 依赖, 防止热更新失效
        // 或者 浏览器安装 React Developer Tools 插件
        'react-dom': 'ReactDOM',
        'react-dom/client': 'ReactDOM',

        // 排除 react-router-dom 依赖, 需要先引入 @remix-run/router、react-router
        'react-router-dom': 'ReactRouterDOM',
      }),
    ],
  });
};
