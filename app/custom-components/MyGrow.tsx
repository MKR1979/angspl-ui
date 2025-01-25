import { memo } from 'react';
import Grow, { GrowProps } from '@mui/material/Grow';
import eq from 'lodash/eq';

interface MyGrowProps extends GrowProps {}

const MyGrow = ({ ...props }: MyGrowProps) => {
  console.log('MyGrow rendered');
  return <Grow {...props} />;
};

export default memo(MyGrow, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
