import { memo } from 'react';
import DialogContent, { DialogContentProps } from '@mui/material/DialogContent';
import eq from 'lodash/eq';
interface MyDialogContentProps extends DialogContentProps {}
const MyDialogContent = ({ ...props }: MyDialogContentProps) => {
  // console.log('MyDialogContent rendered');
  return <DialogContent {...props}></DialogContent>;
};

export default memo(MyDialogContent, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
