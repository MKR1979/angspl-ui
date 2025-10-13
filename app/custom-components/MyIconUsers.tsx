import { IconUsers } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconUsersProps extends IconProps {}
const MyIconUsers = ({ ...props }: MyIconUsersProps) => {
// console.log('My render');
  return <IconUsers {...props}></IconUsers>;
};
export default memo(MyIconUsers, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
