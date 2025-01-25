import { IconMailbox } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconMailboxProps extends IconProps {}
const MyIconMailbox = ({ ...props }: MyIconMailboxProps) => {
  console.log('My render');
  return <IconMailbox {...props}></IconMailbox>;
};
export default memo(MyIconMailbox, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
