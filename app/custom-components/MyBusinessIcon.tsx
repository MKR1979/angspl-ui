import BusinessIcon from '@mui/icons-material/Business';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyBusinessIconProps extends SvgIconProps {}
const MyBusinessIcon = ({ ...props }: MyBusinessIconProps) => {
  // console.log('MyBusinessIcon render');
  return <BusinessIcon {...props}></BusinessIcon>;
};
export default memo(MyBusinessIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
