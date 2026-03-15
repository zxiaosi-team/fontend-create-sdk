import { Empty, Flex, theme } from 'antd';

const { useToken } = theme;

/**
 * 404页面
 * - 需要注册 navigate 实例，用于跳转页面
 */
const NotFound: React.FC = () => {
  const { token } = useToken();
  return (
    <Flex
      style={{
        width: '100%',
        height: '100%',
        background: token.colorBgContainer,
      }}
      justify={'center'}
      align={'center'}
    >
      <Empty description={'找不到页面'} />
    </Flex>
  );
};

export default NotFound;
