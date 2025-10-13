import { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyEditIconProps extends SvgIconProps {}
const MyEditIcon = ({ ...props }: MyEditIconProps) => {
  // console.log('MyEditIcon rendered');
  return <EditIcon {...props}></EditIcon>;
};
export default memo(MyEditIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
