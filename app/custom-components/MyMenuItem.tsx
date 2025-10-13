import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import eq from 'lodash/eq';
import { memo } from 'react';

interface MyMenuItemProps extends MenuItemProps {}

const MyMenuItem = ({ ...props }: MyMenuItemProps) => {
  //console.log('MyMenuItem rendered');
  return <MenuItem {...props}></MenuItem>;
};

export default memo(MyMenuItem, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
