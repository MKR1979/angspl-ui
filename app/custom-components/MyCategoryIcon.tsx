import CategoryIcon from '@mui/icons-material/Category';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyCategoryIconProps extends SvgIconProps {}
const MyCategoryIcon = ({ ...props }: MyCategoryIconProps) => {
  // console.log('MyCategoryIcon render');
  return <CategoryIcon {...props}></CategoryIcon>;
};
export default memo(MyCategoryIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
