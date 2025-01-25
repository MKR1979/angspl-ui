import { memo } from 'react';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import eq from 'lodash/eq';

interface MyListItemProps extends ListItemProps {
  href?: string;
}

const MyListItem = ({ children, ...props }: MyListItemProps) => {
  console.log('MyListItem rendered');
  return <ListItem {...props}> {children}</ListItem>;
};

export default memo(MyListItem, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
