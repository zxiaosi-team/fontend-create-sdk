import { sdk } from '@zxiaosi/sdk';
import { Button } from 'antd';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

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
    <h2>
      subapp1
      <br />
      <br />
      Token: {sdk.storage?.getToken()}
      <br />
      <br />
      <Button onClick={handleChangeTheme}>设置主题</Button>
      Theme: {theme}
      <br />
      <br />
      <Button onClick={() => handlePageTo('/home')}>跳转到 Home</Button>
      <Button onClick={() => handlePageTo('/subapp1/detail')}>
        跳转到详情页
      </Button>
      <Button onClick={() => handlePageTo('/subapp2/detail')}>
        跳转到 Subapp2
      </Button>
      <br />
      <br />
      多语言：{sdk.i18n.intl.get('hello')}
      <Button onClick={handleChangeLocale}>语言切换</Button>
    </h2>
  );
};

export default Home;
