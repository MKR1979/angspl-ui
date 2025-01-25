import { memo } from 'react';
import FormHelperText, { FormHelperTextProps } from '@mui/material/FormHelperText';
import eq from 'lodash/eq';

interface MyFormHelperTextProps extends FormHelperTextProps {}

const MyFormHelperText = ({ children, ...props }: MyFormHelperTextProps) => {
  console.log('MyFormHelperText rendered');
  return <FormHelperText {...props}> {children}</FormHelperText>;
};

export default memo(MyFormHelperText, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
