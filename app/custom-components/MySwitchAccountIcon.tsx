import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MySwitchAccountIconProps extends SvgIconProps {}
const MySwitchAccountIcon = ({ ...props }: MySwitchAccountIconProps) => {
  console.log('MySwitchAccountIcon render');
  return <SwitchAccountIcon {...props}></SwitchAccountIcon>;
};
export default memo(MySwitchAccountIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
