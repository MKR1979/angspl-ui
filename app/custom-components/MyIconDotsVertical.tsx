import { IconDotsVertical } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconDotsVerticalProps extends IconProps {}
const MyIconDotsVertical = ({ ...props }: MyIconDotsVerticalProps) => {
  console.log('My render');
  return <IconDotsVertical {...props}></IconDotsVertical>;
};
export default memo(MyIconDotsVertical, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
