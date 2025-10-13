import { memo } from 'react';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import eq from 'lodash/eq';

interface MyInputLabelProps extends InputLabelProps {}

const MyInputLabel = ({ ...props }: MyInputLabelProps) => {
  //console.log('MyInputLabel  rendered');
  return <InputLabel shrink={true} {...props}></InputLabel>;
};

export default memo(MyInputLabel, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
