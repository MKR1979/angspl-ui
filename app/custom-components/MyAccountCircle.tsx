import AccountCircle from '@mui/icons-material/AccountCircle';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyAccountCircleIconProps extends SvgIconProps {}
const MyAccountCircleIcon = ({ ...props }: MyAccountCircleIconProps) => {
  // console.log('MyAccountCircleIcon render');
  return <AccountCircle {...props}></AccountCircle>;
};
export default memo(MyAccountCircleIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
