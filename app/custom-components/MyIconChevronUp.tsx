import { IconChevronUp } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconChevronUpProps extends IconProps {}
const MyIconChevronUp = ({ ...props }: MyIconChevronUpProps) => {
  console.log('My render');
  return <IconChevronUp {...props}></IconChevronUp>;
};
export default memo(MyIconChevronUp, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
