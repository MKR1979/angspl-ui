import { memo } from 'react';
import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import eq from 'lodash/eq';

interface MyListItemIconProps extends ListItemIconProps {}

const MyListItemIcon = ({ children, ...props }: MyListItemIconProps) => {
  console.log('MyListItemIcon rendered');
  return <ListItemIcon {...props}> {children}</ListItemIcon>;
};

export default memo(MyListItemIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
