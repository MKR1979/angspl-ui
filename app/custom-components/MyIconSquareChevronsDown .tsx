import { IconSquareChevronDown } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconSquareChevronDownProps extends IconProps {}
const MyIconSquareChevronDown = ({ ...props }: MyIconSquareChevronDownProps) => {
  console.log('My render');
  return <IconSquareChevronDown {...props}></IconSquareChevronDown>;
};
export default memo(MyIconSquareChevronDown, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
