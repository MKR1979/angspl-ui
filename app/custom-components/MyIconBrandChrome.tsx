import { IconBrandChrome } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconBrandChromeProps extends IconProps {}
const MyIconBrandChrome = ({ ...props }: MyIconBrandChromeProps) => {
  console.log('My render');
  return <IconBrandChrome {...props}></IconBrandChrome>;
};
export default memo(MyIconBrandChrome, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
