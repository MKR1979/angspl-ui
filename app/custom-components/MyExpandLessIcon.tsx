import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyExpandLessIconProps extends SvgIconProps {}
const MyExpandLessIcon = ({ ...props }: MyExpandLessIconProps) => {
  console.log('MyExpandLessIcon render');
  return <ExpandLessIcon {...props}></ExpandLessIcon>;
};
export default memo(MyExpandLessIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
