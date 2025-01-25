import { ForwardedRef, forwardRef, memo } from 'react';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import eq from 'lodash/eq';

interface MyOutlinedInputProps extends OutlinedInputProps {}

const MyOutlinedInput = forwardRef(({ ...props }: MyOutlinedInputProps, ref: ForwardedRef<unknown>) => {
  //const MyOutlinedInput = ({ ...props }: MyOutlinedInputProps) => {
  console.log('MyOutlinedInput rendered');
  return <OutlinedInput ref={ref} {...props} />;
});
MyOutlinedInput.displayName = 'MyOutlinedInput';
export default memo(MyOutlinedInput, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
