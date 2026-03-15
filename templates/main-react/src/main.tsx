import * as Icons from '@ant-design/icons';
import {
  sdk,
  SdkApiPlugin,
  SdkAppPlugin,
  SdkClientPlugin,
  SdkConfigPlugin,
  SdkI18nPlugin,
  SdkStoragePlugin,
  SdkStorePlugin,
  SdkUIPlugin,
} from '@zxiaosi/sdk';
import { createElement, lazy } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import CustomActions from '@/components/customActions/index.tsx';
import I18nConfig from '@/i18n/index';
import { getRoutesApi, getUserInfoApi, loginApi } from '@/service/index.ts';

import App from './App.tsx';

/**
 * 动态创建Icon
 * @param icon icon名称
 */
const dynamicIcon = (icon: string) => {
  const antIcon: { [key: string]: any } = Icons; // 防止类型报错
  if (!antIcon[icon]) return icon;
  return createElement(antIcon[icon]);
};

const Home = lazy(() => import('@/pages/Home.tsx'));
const NotFound = lazy(() => import('@/pages/NotFound.tsx'));

/** 挂载 SDK */
sdk
  .use(SdkApiPlugin, {
    config: { baseURL: '/api' },
    getRoutesApi: getRoutesApi,
    getUserInfoApi: getUserInfoApi,
    loginApi: loginApi,
  })
  .use(SdkAppPlugin)
  .use(SdkClientPlugin)
  .use(SdkConfigPlugin, {
    locale: 'en-US',
    qiankunMode: 'router',
    proLayoutConfig: {
      title: 'Demo',
      layout: 'mix',
      actionsRender: (props) => <CustomActions {...props} />,
      menuDataRender: (menuData) => {
        return menuData.map((_: any) => ({ ..._, icon: dynamicIcon(_?.icon) }));
      },
    },
  })
  .use(SdkI18nPlugin, I18nConfig)
  .use(SdkStoragePlugin)
  .use(SdkStorePlugin)
  .use(SdkUIPlugin, { Home, NotFound })
  .mount('sdk');

/** 渲染主应用 */
createRoot(document.getElementById('root')!).render(<App />);
