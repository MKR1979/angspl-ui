import { IconBook } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconBookProps extends IconProps {}
const MyIconBook = ({ ...props }: MyIconBookProps) => {
  console.log('My render');
  return <IconBook {...props}></IconBook>;
};
export default memo(MyIconBook, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
