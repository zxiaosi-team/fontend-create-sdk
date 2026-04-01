import react from '@vitejs/plugin-react';
// @ts-ignore
import prefixer from 'postcss-prefix-selector';
import { defineConfig, ConfigEnv } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';
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
    css: {
      postcss: {
        plugins: [
          // https://www.npmjs.com/package/postcss-prefix-selector
          // 配合 main.tsx 中 container.setAttribute() 使用
          prefixer({
            prefix: `[data-qiankun-${name}]`, // 添加作用域
          }),
        ],
      },
    },
    plugins: [
      // react compiler: https://npmx.dev/package/@vitejs/plugin-react#user-content-react-compiler
      react(),
      qiankun({ name: name, sandbox: !!process.env.VITE_SANDBOX }),
      // 配合主应用 index.html 中的预加载资源使用
      viteExternalsPlugin({
        react: 'React',

        // 开发环境不排除 react-dom 依赖, 防止热更新失效
        // 或者 浏览器安装 React Developer Tools 插件
        'react-dom': 'ReactDOM',
        'react-dom/client': 'ReactDOM',

        // 排除 react-router-dom 依赖, 需要先引入 @remix-run/router、react-router
        // 不排除 react-router-dom，会导致 CustomWithAuth 组件不可用
        'react-router-dom': 'ReactRouterDOM',

        // 排除 @zxiaosi/sdk 依赖, 由主应用提供
        qiankun: 'qiankun',
        '@ant-design/pro-layout': 'SdkAntdProLayout',
        'react-intl-universal': 'SdkReactIntlUniversal',
      }),
    ],
  });
};
