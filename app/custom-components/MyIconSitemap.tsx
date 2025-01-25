import { IconSitemap } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconSitemapProps extends IconProps {}
const MyIconSitemap = ({ ...props }: MyIconSitemapProps) => {
  console.log('My render');
  return <IconSitemap {...props}></IconSitemap>;
};
export default memo(MyIconSitemap, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
