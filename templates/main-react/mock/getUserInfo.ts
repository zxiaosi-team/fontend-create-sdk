import { MockMethod } from 'vite-plugin-mock';

const useInfo = {
  user: {
    usename: 'admin',
    nickName: 'Admin',
  },
  permissions: [
    '/home',
    '/subapp1',
    '/subapp1/detail',
    '/subapp2/detail',
    '/subapp2/fullscreen',
  ],
  roles: ['admin'],
  system: {
    // 后端保存的系统设置
    // theme: 'light',
    // locale: 'zh-CN',
  },
};

export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query, headers }) => {
      if (!headers.authorization) {
        return { code: 20041, data: null, msg: '请先登录' };
      } else {
        return { code: 0, data: useInfo, msg: 'success' };
      }
    },
  },
] as MockMethod[];
