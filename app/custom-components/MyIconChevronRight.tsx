import { IconChevronRight } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconChevronRightProps extends IconProps {}
const MyIconChevronRight = ({ ...props }: MyIconChevronRightProps) => {
  //console.log('My render');
  return <IconChevronRight {...props}></IconChevronRight>;
};
export default memo(MyIconChevronRight, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
