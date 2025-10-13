import { memo } from 'react';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import eq from 'lodash/eq';

interface MyDialogTitleProps extends DialogTitleProps {}

const MyDialogTitle = ({ ...props }: MyDialogTitleProps) => {
  // console.log('MyDialogTitle rendered');
  return <DialogTitle {...props}></DialogTitle>;
};

export default memo(MyDialogTitle, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
