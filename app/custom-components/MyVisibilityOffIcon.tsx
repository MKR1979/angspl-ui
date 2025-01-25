import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyVisibilityOffIconProps extends SvgIconProps {}
const MyVisibilityOffIcon = ({ ...props }: MyVisibilityOffIconProps) => {
  console.log('MyVisibilityOffIcon render');
  return <VisibilityOffIcon {...props}></VisibilityOffIcon>;
};
export default memo(MyVisibilityOffIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
