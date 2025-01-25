import { memo } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import eq from 'lodash/eq';

interface MyStackProps extends StackProps {}

const MyStack = ({ children, ...props }: MyStackProps) => {
  console.log('MyStack rendered');
  return <Stack {...props}> {children}</Stack>;
};

export default memo(MyStack, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
