import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyReceiptTwoToneIconProps extends SvgIconProps {}
const MyReceiptTwoToneIcon = ({ ...props }: MyReceiptTwoToneIconProps) => {
  console.log('MyReceiptTwoToneIcon render');
  return <ReceiptTwoToneIcon {...props}></ReceiptTwoToneIcon>;
};
export default memo(MyReceiptTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
