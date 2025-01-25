import { IconPercentage } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconPercentageProps extends IconProps {}
const MyIconPercentage = ({ ...props }: MyIconPercentageProps) => {
  console.log('My render');
  return <IconPercentage {...props}></IconPercentage>;
};
export default memo(MyIconPercentage, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
