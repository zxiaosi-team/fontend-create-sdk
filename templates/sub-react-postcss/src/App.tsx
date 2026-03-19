import { sdk } from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import { cloneDeep } from 'es-toolkit';
import { lazy, Suspense, useMemo } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

const Detail = lazy(() => import('@/pages/detail'));
const Fullscreen = lazy(() => import('@/pages/fullscreen'));
const Layout = lazy(() => import('@/pages/Layout'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/detail',
        element: <Detail />,
      },
      {
        path: '/fullscreen',
        element: <Fullscreen />,
      },
    ],
  },
];

function App() {
  const [locale, theme] = useStore(
    sdk.store,
    useShallow((state) => [state.locale, state.theme]),
  );

  const antdConfig = useMemo(() => {
    return cloneDeep(sdk.config.antdConfig);
  }, [locale, theme]);

  return (
    <ConfigProvider {...antdConfig}>
      <Suspense fallback={sdk.ui.renderComponent('Loading')}>
        <RouterProvider
          router={createBrowserRouter(routes, { basename: '/subapp2' })}
          future={{ v7_startTransition: false }}
        />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
