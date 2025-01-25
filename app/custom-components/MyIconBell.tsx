import { IconBell } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconBellProps extends IconProps {}
const MyIconBell = ({ ...props }: MyIconBellProps) => {
  console.log('My render');
  return <IconBell {...props}></IconBell>;
};
export default memo(MyIconBell, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
