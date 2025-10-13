import { memo } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import eq from 'lodash/eq';

interface MyDrawerProps extends DrawerProps {}

const MyDrawer = ({ children, ...props }: MyDrawerProps) => {
  // console.log('MyDrawer rendered');
  return <Drawer {...props}> {children}</Drawer>;
};

export default memo(MyDrawer, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
