import { memo } from 'react';
import TableHead, { TableHeadProps } from '@mui/material/TableHead';
import eq from 'lodash/eq';

interface MyTableHeadProps extends TableHeadProps {}

const MyTableHead = ({ children, ...props }: MyTableHeadProps) => {
//  console.log('MyTableHead rendered');
  return <TableHead {...props}> {children}</TableHead>;
};

export default memo(MyTableHead, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
