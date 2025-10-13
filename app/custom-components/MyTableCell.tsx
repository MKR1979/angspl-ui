import { memo } from 'react';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import eq from 'lodash/eq';

interface MyTableCellProps extends TableCellProps {}

const MyTableCell = ({ children, ...props }: MyTableCellProps) => {
//  console.log('MyTableCell rendered');
  return <TableCell {...props}> {children}</TableCell>;
};

export default memo(MyTableCell, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
