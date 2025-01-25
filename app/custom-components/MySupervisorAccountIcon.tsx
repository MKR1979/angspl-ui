import { memo } from 'react';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MySupervisorAccountIconProps extends SvgIconProps {}
const MySupervisorAccountIcon = ({ ...props }: MySupervisorAccountIconProps) => {
  console.log('MySupervisorAccountIcon rendered');
  return <SupervisorAccountIcon {...props}></SupervisorAccountIcon>;
};
export default memo(MySupervisorAccountIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
