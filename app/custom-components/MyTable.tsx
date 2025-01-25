import { memo } from 'react';
import Table, { TableProps } from '@mui/material/Table';
import eq from 'lodash/eq';

interface MyTableProps extends TableProps {}

const MyTable = ({ children, ...props }: MyTableProps) => {
  console.log('MyTable rendered');
  return <Table {...props}> {children}</Table>;
};

export default memo(MyTable, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
