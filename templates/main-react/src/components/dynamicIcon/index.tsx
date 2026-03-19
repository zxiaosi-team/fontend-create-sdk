import * as Icons from '@ant-design/icons';
import { createElement } from 'react';


/**
 * 动态创建Icon
 * @param icon icon名称
 */
const dynamicIcon = (icon: string) => {
  const antIcon: { [key: string]: any } = Icons; // 防止类型报错
  if (!antIcon[icon]) return icon;
  return createElement(antIcon[icon]);
};

export default dynamicIcon;