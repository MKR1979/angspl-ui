import { memo } from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';
import eq from 'lodash/eq';

interface MyPaperProps extends PaperProps {}

const MyPaper = ({ children, ...props }: MyPaperProps) => {
  console.log('MyPaper rendered');
  return <Paper {...props}> {children}</Paper>;
};

export default memo(MyPaper, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
