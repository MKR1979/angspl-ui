import FormatAlignJustify from '@mui/icons-material/FormatAlignJustify';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyFormatAlignJustifyIconProps extends SvgIconProps {}
const MyFormatAlignJustifyIcon = ({ ...props }: MyFormatAlignJustifyIconProps) => {
  // console.log('MyFormatAlignJustifyIcon render');
  return <FormatAlignJustify {...props}></FormatAlignJustify>;
};
export default memo(MyFormatAlignJustifyIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
