import { sdk } from '@zxiaosi/sdk';
import { Breadcrumb, Button } from 'antd';

const Fullscreen = () => {
  /** 返回上一级 */
  const handleGoBack = () => {
    sdk.client.navigate('/subapp2/detail');
  };

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: sdk.i18n.intl.get('menu.subapp2'),
            path: '/subapp1',
            onClick: (e) => {
              e?.preventDefault(); // 阻止默认跳转行为
              handleGoBack();
            },
          },
          { title: sdk.i18n.intl.get('menu.subapp2.fullscreen') },
        ]}
      />

      <br />

      <Button onClick={handleGoBack} type='primary'>
        返回上一级
      </Button>
    </>
  );
};

export default Fullscreen;
