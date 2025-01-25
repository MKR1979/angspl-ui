import { memo } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyClearIconProps extends SvgIconProps {}
const MyClearIcon = ({ ...props }: MyClearIconProps) => {
  console.log('MyClearIcon rendered');
  return <ClearIcon {...props}></ClearIcon>;
};
export default memo(MyClearIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
