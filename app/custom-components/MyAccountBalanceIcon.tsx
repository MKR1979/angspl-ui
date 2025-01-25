import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyAccountBalanceIcon extends SvgIconProps {}
const MyAccountBalanceIcon = ({ ...props }: MyAccountBalanceIcon) => {
  console.log('MyAccountBalanceIcon render');
  return <AccountBalanceIcon {...props}></AccountBalanceIcon>;
};
export default memo(MyAccountBalanceIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
