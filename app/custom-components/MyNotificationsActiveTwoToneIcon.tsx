import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyNotificationsActiveTwoToneIconProps extends SvgIconProps {}
const MyNotificationsActiveTwoToneIcon = ({ ...props }: MyNotificationsActiveTwoToneIconProps) => {
  console.log('MyNotificationsActiveTwoToneIcon render');
  return <NotificationsActiveTwoToneIcon {...props}></NotificationsActiveTwoToneIcon>;
};
export default memo(MyNotificationsActiveTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
