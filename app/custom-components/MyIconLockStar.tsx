import { IconLockStar } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconLockStarProps extends IconProps {}
const MyIconLockStar = ({ ...props }: MyIconLockStarProps) => {
  console.log('My render');
  return <IconLockStar {...props}></IconLockStar>;
};
export default memo(MyIconLockStar, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
