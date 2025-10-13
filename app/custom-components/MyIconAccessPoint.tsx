import { IconAccessPoint } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconAccessPointProps extends IconProps {}
const MyIconAccessPoint = ({ ...props }: MyIconAccessPointProps) => {
  //console.log('My render');
  return <IconAccessPoint {...props}></IconAccessPoint>;
};
export default memo(MyIconAccessPoint, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
