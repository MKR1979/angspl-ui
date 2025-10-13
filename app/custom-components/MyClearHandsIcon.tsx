import { memo } from 'react';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyCleanHandsIconProps extends SvgIconProps {}
const MyCleanHandsIcon = ({ ...props }: MyCleanHandsIconProps) => {
  // console.log('MyCleanHandsIcon rendered');
  return <CleanHandsIcon {...props}></CleanHandsIcon>;
};
export default memo(MyCleanHandsIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
