import { memo } from 'react';
import MuiPagination, { PaginationProps } from '@mui/material/Pagination';
import eq from 'lodash/eq';

interface MyMuiPaginationProps extends PaginationProps {}

const MyMuiPagination = ({ ...props }: MyMuiPaginationProps) => {
  //console.log('MyMuiPagination rendered');
  return <MuiPagination {...props} />;
};

export default memo(MyMuiPagination, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
