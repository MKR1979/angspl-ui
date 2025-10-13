import { IconMinusVertical } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconMinusVerticalProps extends IconProps {}
const MyIconMinusVertical = ({ ...props }: MyIconMinusVerticalProps) => {
 // console.log('My render');
  return <IconMinusVertical {...props}></IconMinusVertical>;
};
export default memo(MyIconMinusVertical, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
