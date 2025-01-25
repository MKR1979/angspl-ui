import Dialog, { DialogProps } from '@mui/material/Dialog';
import eq from 'lodash/eq';
import { memo } from 'react';
interface MyDialogProps extends DialogProps {}
const MyDialogContent = ({ ...props }: MyDialogProps) => {
  console.log('MyDialogContent rendered');
  return <Dialog {...props}></Dialog>;
};

export default memo(MyDialogContent, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
