import { memo } from 'react';
import Alert, { AlertProps } from '@mui/material/Alert';
import eq from 'lodash/eq';

interface MyAlertProps extends AlertProps {}

const MyAlert = ({ children, ...props }: MyAlertProps) => {
  console.log('MyAlert rendered');
  return <Alert {...props}> {children}</Alert>;
};

export default memo(MyAlert, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
