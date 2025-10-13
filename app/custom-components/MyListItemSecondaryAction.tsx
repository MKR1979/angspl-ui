import { memo } from 'react';
import ListItemSecondaryAction, { ListItemSecondaryActionProps } from '@mui/material/ListItemSecondaryAction';
import eq from 'lodash/eq';

interface MyListItemSecondaryActionProps extends ListItemSecondaryActionProps {}

const MyListItemSecondaryAction = ({ children, ...props }: MyListItemSecondaryActionProps) => {
 //console.log('MyListItemSecondaryAction rendered');
  return <ListItemSecondaryAction {...props}> {children}</ListItemSecondaryAction>;
};

export default memo(MyListItemSecondaryAction, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
