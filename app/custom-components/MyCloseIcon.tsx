import CloseIcon from '@mui/icons-material/Close';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyCloseIconProps extends SvgIconProps {}
const MyCloseIcon = ({ ...props }: MyCloseIconProps) => {
  // console.log('MyCloseIcon render');
  return <CloseIcon {...props}></CloseIcon>;
};
export default memo(MyCloseIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
