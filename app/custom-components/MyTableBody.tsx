import { memo } from 'react';
import TableBody, { TableBodyProps } from '@mui/material/TableBody';
import eq from 'lodash/eq';

interface MyTableBodyProps extends TableBodyProps {}

const MyTableBody = ({ children, ...props }: MyTableBodyProps) => {
  console.log('MyTableBody rendered');
  return <TableBody {...props}> {children}</TableBody>;
};

export default memo(MyTableBody, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
