import { ForwardedRef, forwardRef, memo } from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import eq from 'lodash/eq';

interface MyAvatarProps extends AvatarProps {
  component?: unknown | any;
}

const MyAvatar = forwardRef(({ ...props }: MyAvatarProps, ref: ForwardedRef<unknown>) => {
  console.log('MyAvatar rendered');
  return <Avatar ref={ref as unknown as any} {...props} />;
});
MyAvatar.displayName = 'MyAvatar';
export default memo(MyAvatar, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
