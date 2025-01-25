import { memo } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyDashboardIconProps extends SvgIconProps {}
const MyDashboardIcon = ({ ...props }: MyDashboardIconProps) => {
  console.log('MyDashboardIcon rendered');
  return <DashboardIcon {...props}></DashboardIcon>;
};

export default memo(MyDashboardIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
