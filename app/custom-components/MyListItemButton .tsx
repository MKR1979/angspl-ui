import { memo } from 'react';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import eq from 'lodash/eq';

interface MyListItemButtonProps extends ListItemButtonProps {
  component?: any;
  href?: string;
}

const MyListItemButton = ({ children, ...props }: MyListItemButtonProps) => {
  console.log('MyListItemButton rendered');
  return <ListItemButton {...props}> {children}</ListItemButton>;
};

export default memo(MyListItemButton, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
