import { sdk } from '@zxiaosi/sdk';
import { Alert, Button, Card, DatePicker, Space } from 'antd';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import './index.css';
import CustomCrumb from '@/components/customCrumb';

/** 首页 */
const Home = () => {
  const [theme, setTheme, locale, setLocale] = useStore(
    sdk.store,
    useShallow((state) => [
      state.theme,
      state.setTheme,
      state.locale,
      state.setLocale,
    ]),
  );

  /** 跳转页面 */
  const handlePageTo = (uri: string) => {
    sdk.client.navigate(uri);
  };

  /** 设置主题 */
  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  /** 语言切换 */
  const handleChangeLocale = () => {
    setLocale(locale === 'zh-CN' ? 'en-US' : 'zh-CN');
  };

  return (
    <div className='home'>
      <Space direction='vertical' style={{ display: 'flex' }}>
        <CustomCrumb />

        <Card title='CSS 变量、Token 变量'>
          <Space wrap>
            {/* 在 src/index.css 中 */}
            <div style={{ color: 'var(--primary)' }}>CSS 变量</div>
            <Alert message='品牌色' type='info' />
            <Alert message='成功色' type='success' />
            <Alert message='警戒色' type='warning' />
            <Alert message='错误色' type='error' />
          </Space>
        </Card>

        <Card title='全局样式、应用样式'>
          <Space wrap>
            <div className='global-style'>全局样式</div>
            <div className='app-style'>应用样式</div>
          </Space>
        </Card>

        <Card title='应用跳转'>
          <Space wrap>
            <Button type='primary' onClick={() => handlePageTo('/subapp1')}>
              跳转到 Subapp1
            </Button>
            <Button
              type='primary'
              onClick={() => handlePageTo('/subapp2/detail')}
            >
              跳转到 Subapp2
            </Button>
          </Space>
        </Card>

        <Card title='Antd 语言包、React Intl 国际化'>
          <Space>
            <DatePicker />
            {sdk.i18n.intl.get('hello')}
          </Space>
        </Card>

        <Card title='全局状态管理'>
          <Space wrap>
            <Button type='dashed' danger onClick={handleChangeTheme}>
              更新主题
            </Button>

            <Button type='dashed' danger onClick={handleChangeLocale}>
              更新语言包
            </Button>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default Home;
