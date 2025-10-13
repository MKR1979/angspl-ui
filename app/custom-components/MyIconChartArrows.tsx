import { IconChartArrows } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconChartArrowsProps extends IconProps {}
const MyIconChartArrows = ({ ...props }: MyIconChartArrowsProps) => {
  //console.log('My render');
  return <IconChartArrows {...props}></IconChartArrows>;
};
export default memo(MyIconChartArrows, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
