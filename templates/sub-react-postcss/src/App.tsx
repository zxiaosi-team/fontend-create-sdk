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

const Home = lazy(() => import('@/pages/Home'));
const Detail = lazy(() => import('@/pages/Detail'));
const Layout = lazy(() => import('@/pages/Layout'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/detail',
        element: <Detail />,
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
          router={createBrowserRouter(routes, { basename: '/subapp1' })}
          future={{ v7_startTransition: false }}
        />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
