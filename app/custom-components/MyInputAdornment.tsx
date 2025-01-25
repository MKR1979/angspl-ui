import { memo } from 'react';
import InputAdornment, { InputAdornmentProps } from '@mui/material/InputAdornment';
import eq from 'lodash/eq';

interface MyInputAdornmentProps extends InputAdornmentProps {}

const MyInputAdornment = ({ children, ...props }: MyInputAdornmentProps) => {
  console.log('MyInputAdornment rendered');
  return <InputAdornment {...props}> {children}</InputAdornment>;
};

export default memo(MyInputAdornment, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
