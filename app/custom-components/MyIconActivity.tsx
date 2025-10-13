import { IconActivity } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconActivityProps extends IconProps {}
const MyIconActivity = ({ ...props }: MyIconActivityProps) => {
  //console.log('My render');
  return <IconActivity {...props}></IconActivity>;
};
export default memo(MyIconActivity, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
