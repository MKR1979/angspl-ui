import { IconFlame } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconFlameProps extends IconProps {}
const MyIconFlame = ({ ...props }: MyIconFlameProps) => {
  console.log('My render');
  return <IconFlame {...props}></IconFlame>;
};
export default memo(MyIconFlame, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
