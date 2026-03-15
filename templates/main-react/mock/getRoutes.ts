import { MockMethod } from 'vite-plugin-mock';

const handleRoutesData = () => {
  const subapp1Entry = 'http://localhost:5174';
  const subapp2Entry = 'http://localhost:5175';

  return [
    {
      name: 'Home',
      path: '/home',
      component: 'Home',
      icon: 'DashboardOutlined',
      locale: 'menu.home',
      hideInMenu: false,
    },
    {
      name: 'Subapp1',
      path: '/subapp1',
      component: 'Microapp',
      icon: 'SettingOutlined',
      locale: 'menu.subapp1',
      routeAttr: `{"name": "subapp1", "entry": "${subapp1Entry}", "activeRule": "/subapp1", "rootId": "sub-app"}`,
      children: [
        {
          name: 'Subapp1 detail',
          path: '/subapp1/detail',
          component: 'Microapp',
          locale: 'menu.subapp1.detail',
          hideInMenu: true,
        },
      ],
    },
    {
      name: 'Subapp2',
      path: '/',
      component: 'Outlet',
      icon: 'SettingOutlined',
      locale: 'menu.subapp2',
      children: [
        {
          name: 'Subapp2 detail',
          path: '/subapp2/detail',
          component: 'Microapp',
          locale: 'menu.subapp2.detail',
          routeAttr: `{"name": "subapp2", "entry": "${subapp2Entry}", "activeRule": "/subapp2", "rootId": "sub-app"}`,
        },
        {
          name: 'Subapp2 fullscreen',
          path: '/subapp2/fullscreen',
          component: 'Microapp',
          locale: 'menu.subapp2.fullscreen',
          routeAttr: `{"name": "subapp2", "entry": "${subapp2Entry}", "activeRule": "/subapp2", "rootId": "sub-app", "noLayout": true}`, // fullscreen
        },
      ],
    },
  ];
};

export default [
  {
    url: '/api/getRoutes',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query, headers }) => {
      if (!headers.authorization) {
        return { code: 20041, data: null, msg: '请先登录' };
      } else {
        const routes = handleRoutesData();
        return { code: 0, data: routes, msg: 'success' };
      }
    },
  },
] as MockMethod[];
