import Brightness6Icon from '@mui/icons-material/Brightness6';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyBrightness6IconProps extends SvgIconProps {}
const MyBrightness6Icon = ({ ...props }: MyBrightness6IconProps) => {
  // console.log('MyBrightness6Icon render');
  return <Brightness6Icon {...props}></Brightness6Icon>;
};
export default memo(MyBrightness6Icon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
