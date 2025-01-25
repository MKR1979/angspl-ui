import { ForwardedRef, forwardRef, memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import eq from 'lodash/eq';
interface MyBoxProps extends BoxProps {
  component?: any;
}

const MyBox = forwardRef(({ children, ...props }: MyBoxProps, ref: ForwardedRef<unknown>) => {
  console.log('MyBox rendered');
  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
});
MyBox.displayName = 'MyBox';
export default memo(MyBox, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
