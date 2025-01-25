import { memo } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import eq from 'lodash/eq';

const MyTextField = ({ ...rest }: TextFieldProps) => {
  console.log('MyTextField rendered');
  return <TextField InputLabelProps={{ shrink: true }} size="small" variant="outlined" fullWidth {...rest}></TextField>;
};

export default memo(MyTextField, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
