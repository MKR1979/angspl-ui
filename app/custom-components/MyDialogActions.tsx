import { memo } from 'react';
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions';
import eq from 'lodash/eq';
interface MyDialogActionsProps extends DialogActionsProps {}
const MyDialogActions = ({ ...props }: MyDialogActionsProps) => {
  console.log('MyDialogActions rendered');
  return <DialogActions className="dialog-actions-dense" {...props}></DialogActions>;
};

export default memo(MyDialogActions, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
