import MenuIcon from '@mui/icons-material/Menu';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyMenuIconProps extends SvgIconProps {}
const MyMenuIcon = ({ ...props }: MyMenuIconProps) => {
  console.log('MyMenuIcon render');
  return <MenuIcon {...props}></MenuIcon>;
};
export default memo(MyMenuIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
