import { memo } from 'react';
import ClickAwayListener, { ClickAwayListenerProps } from '@mui/material/ClickAwayListener';
import eq from 'lodash/eq';

interface MyClickAwayListenerProps extends ClickAwayListenerProps {}

const MyClickAwayListener = ({ ...props }: MyClickAwayListenerProps) => {
  console.log('MyClickAwayListener rendered');
  return <ClickAwayListener {...props} />;
};

export default memo(MyClickAwayListener, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
