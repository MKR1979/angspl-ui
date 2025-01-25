import { memo } from 'react';
import ListItemAvatar, { ListItemAvatarProps } from '@mui/material/ListItemAvatar';
import eq from 'lodash/eq';

interface MyListItemAvatarProps extends ListItemAvatarProps {
  href?: string;
}

const MyListItemAvatar = ({ children, ...props }: MyListItemAvatarProps) => {
  console.log('MyListItemAvatar rendered');
  return <ListItemAvatar {...props}> {children}</ListItemAvatar>;
};

export default memo(MyListItemAvatar, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
