import PendingActionsIcon from '@mui/icons-material/PendingActions';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyPendingActionsIconProps extends SvgIconProps {}
const MyPendingActionsIcon = ({ ...props }: MyPendingActionsIconProps) => {
  console.log('MyPendingActionsIcon render');
  return <PendingActionsIcon {...props}></PendingActionsIcon>;
};
export default memo(MyPendingActionsIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
