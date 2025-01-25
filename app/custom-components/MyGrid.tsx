import { memo } from 'react';
import Grid, { Grid2Props } from '@mui/material/Grid2';
import eq from 'lodash/eq';

interface MyGridProps extends Grid2Props {}

const MyGrid = ({ children, ...props }: MyGridProps) => {
  console.log('MyGrid rendered');
  return <Grid {...props}> {children}</Grid>;
};

export default memo(MyGrid, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
