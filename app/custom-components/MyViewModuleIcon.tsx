import ViewModuleIcon from '@mui/icons-material/ViewModule';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyViewModuleIconProps extends SvgIconProps {}
const MyViewModuleIcon = ({ ...props }: MyViewModuleIconProps) => {
  console.log('MyViewModuleIcon render');
  return <ViewModuleIcon {...props}></ViewModuleIcon>;
};
export default memo(MyViewModuleIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
