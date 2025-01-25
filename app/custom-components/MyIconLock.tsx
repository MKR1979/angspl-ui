import { IconLock } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconLockProps extends IconProps {}
const MyIconLock = ({ ...props }: MyIconLockProps) => {
  console.log('My render');
  return <IconLock {...props}></IconLock>;
};
export default memo(MyIconLock, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
