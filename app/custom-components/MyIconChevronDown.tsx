import { IconChevronDown } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconChevronDownProps extends IconProps {}
const MyIconChevronDown = ({ ...props }: MyIconChevronDownProps) => {
  //console.log('My render');
  return <IconChevronDown {...props}></IconChevronDown>;
};
export default memo(MyIconChevronDown, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
