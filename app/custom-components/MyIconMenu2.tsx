import { IconMenu2 } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconMenu2Props extends IconProps {}
const MyIconMenu2 = ({ ...props }: MyIconMenu2Props) => {
  console.log('My render');
  return <IconMenu2 {...props}></IconMenu2>;
};
export default memo(MyIconMenu2, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
