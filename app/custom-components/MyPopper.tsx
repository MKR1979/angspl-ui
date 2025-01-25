import { memo } from 'react';
import Popper, { PopperProps } from '@mui/material/Popper';
import eq from 'lodash/eq';

interface MyPopperProps extends PopperProps {
  href?: string;
}

const MyPopper = ({ ...props }: MyPopperProps) => {
  console.log('MyPopper rendered');
  return <Popper {...props} />;
};

export default memo(MyPopper, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
