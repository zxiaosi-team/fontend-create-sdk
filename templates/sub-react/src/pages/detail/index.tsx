import { sdk } from '@zxiaosi/sdk';
import { Button } from 'antd';

import CustomCrumb from '@/components/customCrumb';

const Detail = () => {
  /** 返回上一级 */
  const handleGoBack = () => {
    sdk.client.navigate('/subapp1');
  };

  return (
    <>
      <CustomCrumb />

      <br />

      <Button onClick={handleGoBack} type='primary'>
        返回上一级
      </Button>
    </>
  );
};

export default Detail;
