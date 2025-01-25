import { IconClipboardData } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconClipboardDataProps extends IconProps {}
const MyIconClipboardData = ({ ...props }: MyIconClipboardDataProps) => {
  console.log('My render');
  return <IconClipboardData {...props}></IconClipboardData>;
};
export default memo(MyIconClipboardData, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
