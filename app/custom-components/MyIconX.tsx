import { IconX } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconXProps extends IconProps {}
const MyIconX = ({ ...props }: MyIconXProps) => {
  console.log('My render');
  return <IconX {...props}></IconX>;
};
export default memo(MyIconX, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
