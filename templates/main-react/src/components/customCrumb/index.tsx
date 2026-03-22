import { sdk, useCrumb, useIntl } from '@zxiaosi/sdk';
import { Breadcrumb, type BreadcrumbProps } from 'antd';
import { useMemo } from 'react';

/**
 * Antd 面包屑
 * - 使用 useCrumb 自动填充 items 属性
 * - 更多参考：https://ant.design/components/breadcrumb-cn
 */
const CustomCrumb: React.FC = (props: BreadcrumbProps) => {
  const crumb = useCrumb();
  const intl = useIntl();

  /** 页面跳转 */
  const handlePageTo = (url: string, e?: any) => {
    e?.preventDefault(); // 阻止默认跳转行为
    sdk.client?.navigate(url);
  };

  const items = useMemo(() => {
    if (!crumb || crumb.length === 0) return [];

    return crumb.map((item, index: number) => {
      let path = item.path;
      const { name, locale } = item;

      // 首页的子页面，默认选中第一个子页面
      if (path === '/' && item.children && item.children.length > 0) {
        const children = item.children?.filter((_: any) => !_.hideInMenu);
        path = children[0].path;
      }

      const text = intl.formatMessage({ id: locale }) || name;
      if (index === crumb.length - 1) {
        return { title: text };
      } else {
        return {
          title: text,
          href: path,
          onClick: (e: any) => handlePageTo(path, e),
        };
      }
    });
  }, [crumb]);

  return <Breadcrumb items={items} {...props} />;
};

export default CustomCrumb;
