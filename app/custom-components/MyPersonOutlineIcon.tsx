import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyPersonOutlineIconProps extends SvgIconProps {}
const MyPersonOutlineIcon = ({ ...props }: MyPersonOutlineIconProps) => {
  console.log('MyPersonOutlineIcon render');
  return <PersonOutlineIcon {...props}></PersonOutlineIcon>;
};
export default memo(MyPersonOutlineIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
