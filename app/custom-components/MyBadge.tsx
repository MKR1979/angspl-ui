import { memo } from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import eq from 'lodash/eq';

interface MyBadgeProps extends BadgeProps {}

const MyBadge = ({ children, ...props }: MyBadgeProps) => {
  console.log('MyList rendered');
  return <Badge {...props}> {children}</Badge>;
};

export default memo(MyBadge, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
