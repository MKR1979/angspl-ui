import AddIcon from '@mui/icons-material/Add';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyAddIcon extends SvgIconProps {}
const MyAddIcon = ({ ...props }: MyAddIcon) => {
  // console.log('MyAddIcon render');
  return <AddIcon {...props}></AddIcon>;
};
export default memo(MyAddIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
