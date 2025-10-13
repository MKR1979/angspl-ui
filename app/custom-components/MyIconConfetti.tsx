import { IconConfetti } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconTieProps extends IconProps {}
const MyIconTie = ({ ...props }: MyIconTieProps) => {
  //console.log('My render');
  return <IconConfetti {...props}></IconConfetti>;
};
export default memo(MyIconTie, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
