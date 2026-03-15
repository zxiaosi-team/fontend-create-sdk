import { sdk } from '@zxiaosi/sdk';

/** 获取用户信息 */
export const getUserInfoApi = async () => {
  return sdk.api.request('/getUserInfo', { method: 'GET' });
};

/** 获取路由 */
export const getRoutesApi = async () => {
  return sdk.api.request('/getRoutes', { method: 'GET' });
};

/** 登录接口 */
export const loginApi = async (params: any) => {
  return sdk.api.request('/login', { method: 'POST', data: params });
};
