import { IconLogout } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconLogoutProps extends IconProps {}
const MyIconLogout = ({ ...props }: MyIconLogoutProps) => {
  console.log('My render');
  return <IconLogout {...props}></IconLogout>;
};
export default memo(MyIconLogout, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
