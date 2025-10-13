import { memo } from 'react';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import eq from 'lodash/eq';

interface MyTableRowProps extends TableRowProps {}

const MyTableRow = ({ children, ...props }: MyTableRowProps) => {
// console.log('MyTableRow rendered');
  return <TableRow {...props}> {children}</TableRow>;
};

export default memo(MyTableRow, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
