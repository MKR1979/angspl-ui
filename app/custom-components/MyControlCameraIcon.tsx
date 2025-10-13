import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyControlCameraIconProps extends SvgIconProps {}
const MyControlCameraIcon = ({ ...props }: MyControlCameraIconProps) => {
  // console.log('MyControlCameraIcon render');
  return <ControlCameraIcon {...props}></ControlCameraIcon>;
};
export default memo(MyControlCameraIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
