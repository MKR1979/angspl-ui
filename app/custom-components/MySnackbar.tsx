import { memo } from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import eq from 'lodash/eq';

interface MySnackbarProps extends SnackbarProps {}

const MySnackbar = ({ ...props }: MySnackbarProps) => {
  console.log('MySnackbar rendered');
  return <Snackbar {...props} />;
};

export default memo(MySnackbar, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
