import StraightenIcon from '@mui/icons-material/Straighten';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyStraightenIconProps extends SvgIconProps {}
const MyStraightenIcon = ({ ...props }: MyStraightenIconProps) => {
  console.log('MyStraightenIcon render');
  return <StraightenIcon {...props}></StraightenIcon>;
};
export default memo(MyStraightenIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
