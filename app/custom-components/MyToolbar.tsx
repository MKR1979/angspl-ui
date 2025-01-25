import { memo } from 'react';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import eq from 'lodash/eq';

interface MyToolbarProps extends ToolbarProps {}

const MyToolbar = ({ children, ...props }: MyToolbarProps) => {
  console.log('MyToolbar rendered');
  return <Toolbar {...props}> {children}</Toolbar>;
};

export default memo(MyToolbar, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
