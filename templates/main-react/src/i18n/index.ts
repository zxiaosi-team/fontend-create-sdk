import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';

const intlConfig = {
  'zh-CN': {
    hello: '你好，世界',
    'menu.home': '首页',
    'menu.subapp1': '子应用1',
    'menu.subapp1.detail': '子应用1详情',
    'menu.subapp2': '子应用2',
    'menu.subapp2.detail': '子应用2详情',
    'menu.subapp2.fullscreen': '子应用2全屏',
  },
  'en-US': {
    hello: 'Hello, World',
    'menu.home': 'Home',
    'menu.subapp1': 'Subapp1',
    'menu.subapp1.detail': 'Subapp1 detail',
    'menu.subapp2': 'Subapp2',
    'menu.subapp2.detail': 'Subapp2 detail',
    'menu.subapp2.fullscreen': 'Subapp2 fullscreen',
  },
};

const loadLocale = (locale: string) => {
  switch (locale) {
    case 'zh-CN':
      dayjs.locale('zh');
      return zhCN;
    case 'en-US':
      dayjs.locale('en');
      return enUS;
    default:
      return undefined;
  }
};

export default { intlConfig, loadLocale };
