import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyFiberManualRecordIconProps extends SvgIconProps {}
const MyFiberManualRecordIcon = ({ ...props }: MyFiberManualRecordIconProps) => {
  // console.log('MyFiberManualRecordIcon render');
  return <FiberManualRecordIcon {...props}></FiberManualRecordIcon>;
};
export default memo(MyFiberManualRecordIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
