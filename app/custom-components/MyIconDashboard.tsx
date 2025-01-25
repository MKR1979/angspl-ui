import { IconDashboard } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconDashboardProps extends IconProps {}
const MyIconDashboard = ({ ...props }: MyIconDashboardProps) => {
  console.log('My render');
  return <IconDashboard {...props}></IconDashboard>;
};
export default memo(MyIconDashboard, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
