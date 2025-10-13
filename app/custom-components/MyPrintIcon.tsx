import PrintIcon from '@mui/icons-material/Print';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyPrintIconProps extends SvgIconProps {}
const MyPrintIcon = ({ ...props }: MyPrintIconProps) => {
  //console.log('MyPrintIcon render');
  return <PrintIcon {...props}></PrintIcon>;
};
export default memo(MyPrintIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
