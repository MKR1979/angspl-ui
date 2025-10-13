import { memo } from 'react';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import eq from 'lodash/eq';

interface MyFormControlProps extends FormControlProps {}

const MyFormControl = ({ ...props }: MyFormControlProps) => {
  // console.log('MyFormControl rendered');
  return <FormControl variant="outlined" fullWidth {...props}></FormControl>;
};

export default memo(MyFormControl, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
