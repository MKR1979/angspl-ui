import { memo } from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import eq from 'lodash/eq';

interface MyCircularProgressProps extends CircularProgressProps {}

const MyCircularProgress = ({ ...props }: MyCircularProgressProps) => {
  console.log('MyCircularProgress rendered');
  return <CircularProgress {...props}></CircularProgress>;
};

export default memo(MyCircularProgress, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
