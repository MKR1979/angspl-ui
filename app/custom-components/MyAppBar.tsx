import { memo } from 'react';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import eq from 'lodash/eq';

interface MyAppBarProps extends AppBarProps {}

const MyAppBar = ({ children, ...props }: MyAppBarProps) => {
  // console.log('MyAppBar rendered');
  return <AppBar {...props}> {children}</AppBar>;
};

export default memo(MyAppBar, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
