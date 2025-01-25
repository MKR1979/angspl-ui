import { IconClock12 } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconClock12Props extends IconProps {}
const MyIconClock12 = ({ ...props }: MyIconClock12Props) => {
  console.log('My render');
  return <IconClock12 {...props}></IconClock12>;
};
export default memo(MyIconClock12, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
