import HomeIcon from '@mui/icons-material/Home';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyHomeIconProps extends SvgIconProps {}
const MyHomeIcon = ({ ...props }: MyHomeIconProps) => {
  console.log('MyHomeIcon render');
  return <HomeIcon {...props}></HomeIcon>;
};
export default memo(MyHomeIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
