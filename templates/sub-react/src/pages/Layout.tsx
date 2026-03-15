import { sdk } from '@zxiaosi/sdk';
import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const WithAuth = () => {
  const location = useLocation();

  const isAuth = useMemo(() => {
    const pathname = sdk.client.location.pathname;
    return sdk.app.permissions.includes(pathname);
  }, [location]);

  if (isAuth) {
    return <Outlet />;
  } else {
    // return sdk.ui.renderComponent('NoPermission');
    return <>无权限</>;
  }
};

export default WithAuth;
