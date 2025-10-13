import { IconKey } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconKeyProps extends IconProps {}
const MyIconKey = ({ ...props }: MyIconKeyProps) => {
  //console.log('My render');
  return <IconKey {...props}></IconKey>;
};
export default memo(MyIconKey, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
