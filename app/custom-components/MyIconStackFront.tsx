import { IconStackFront } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconStackFrontProps extends IconProps {}
const MyIconStackFront = ({ ...props }: MyIconStackFrontProps) => {
  console.log('My render');
  return <IconStackFront {...props}></IconStackFront>;
};
export default memo(MyIconStackFront, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
