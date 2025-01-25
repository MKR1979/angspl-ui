import { memo } from 'react';
import TableContainer, { TableContainerProps } from '@mui/material/TableContainer';
import eq from 'lodash/eq';

interface MyTableContainerProps extends TableContainerProps {}

const MyTableContainer = ({ children, ...props }: MyTableContainerProps) => {
  console.log('MyTableContainer rendered');
  return <TableContainer {...props}> {children}</TableContainer>;
};

export default memo(MyTableContainer, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
