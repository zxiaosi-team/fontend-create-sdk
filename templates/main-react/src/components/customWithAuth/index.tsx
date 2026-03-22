import { sdk, usePermission } from '@zxiaosi/sdk';
import { Outlet } from 'react-router-dom';

/** 判断组件是否有权限 */
const CustomWithAuth: React.FC = ({ children }: any) => {
  const isAuth = usePermission();

  if (isAuth) {
    return children || <Outlet />;
  } else {
    return sdk.ui.renderComponent('NoPermission');
  }
};

export default CustomWithAuth;
