import InfoIcon from '@mui/icons-material/Info';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyInfoIcon extends SvgIconProps {}
const MyInfoIcon = ({ ...props }: MyInfoIcon) => {
// console.log('MyInfoIcon render');
  return <InfoIcon {...props}></InfoIcon>;
};
export default memo(MyInfoIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
