import Menu, { MenuProps } from '@mui/material/Menu';
import eq from 'lodash/eq';
import { memo } from 'react';

interface MyMenuProps extends MenuProps {}

const MyMenu = ({ ...props }: MyMenuProps) => {
  console.log('MyMenu rendered');
  return <Menu {...props}></Menu>;
};

export default memo(MyMenu, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
