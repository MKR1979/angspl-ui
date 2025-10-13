import MoreVertIcon from '@mui/icons-material/MoreVert';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyMoreVertIcon extends SvgIconProps {}
const MyMoreVertIcon = ({ ...props }: MyMoreVertIcon) => {
 // console.log('MyMoreVertIcon render');
  return <MoreVertIcon {...props}></MoreVertIcon>;
};
export default memo(MyMoreVertIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
