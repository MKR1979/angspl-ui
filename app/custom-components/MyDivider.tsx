import { memo } from 'react';
import Divider, { DividerProps } from '@mui/material/Divider';
import eq from 'lodash/eq';

interface MyDividerProps extends DividerProps {}

const MyDivider = ({ ...props }: MyDividerProps) => {
  // console.log('MyDivider rendered');
  return <Divider {...props}></Divider>;
};

export default memo(MyDivider, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
