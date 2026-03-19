import { sdk } from '@zxiaosi/sdk';
import { Breadcrumb, Button } from 'antd';

const Detail = () => {
  /** 返回上一级 */
  const handleGoBack = () => {
    sdk.client.navigate('/subapp1');
  };

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: sdk.i18n.intl.get('menu.subapp1'),
            path: '/subapp1',
            onClick: (e) => {
              e?.preventDefault(); // 阻止默认跳转行为
              handleGoBack();
            },
          },
          { title: sdk.i18n.intl.get('menu.subapp1.detail') },
        ]}
      />

      <br />

      <Button onClick={handleGoBack} type='primary'>
        返回上一级
      </Button>
    </>
  );
};

export default Detail;
