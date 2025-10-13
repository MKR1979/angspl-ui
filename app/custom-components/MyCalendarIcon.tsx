import { memo } from 'react';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyCalendarIconProps extends SvgIconProps {}
const MyCalendarIcon = ({ ...props }: MyCalendarIconProps) => {
  // console.log('MyCalendarIcon rendered');
  return <CalendarIcon {...props}></CalendarIcon>;
};
export default memo(MyCalendarIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
