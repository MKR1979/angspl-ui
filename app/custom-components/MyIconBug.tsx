import { IconBug } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconBugProps extends IconProps {}
const MyIconBug = ({ ...props }: MyIconBugProps) => {
  console.log('My render');
  return <IconBug {...props}></IconBug>;
};
export default memo(MyIconBug, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
