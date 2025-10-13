import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyAutoFixHighIcon extends SvgIconProps {}
const MyAutoFixHighIcon = ({ ...props }: MyAutoFixHighIcon) => {
  // console.log('MyAutoFixHighIcon render');
  return <AutoFixHighIcon {...props}></AutoFixHighIcon>;
};
export default memo(MyAutoFixHighIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
