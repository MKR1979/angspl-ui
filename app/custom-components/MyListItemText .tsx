import { memo } from 'react';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import eq from 'lodash/eq';

interface MyListItemTextProps extends ListItemTextProps {
  primary?: React.ReactNode;
}

const MyListItemText = ({ children, ...props }: MyListItemTextProps) => {
  console.log('MyListItemText rendered');
  return <ListItemText {...props}> {children}</ListItemText>;
};

export default memo(MyListItemText, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
