import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyArrowDropDownIcon extends SvgIconProps {}
const MyArrowDropDownIcon = ({ ...props }: MyArrowDropDownIcon) => {
  // console.log('MyArrowDropDownIcon render');
  return <ArrowDropDownIcon {...props}></ArrowDropDownIcon>;
};
export default memo(MyArrowDropDownIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
