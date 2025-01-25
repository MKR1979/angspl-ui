import AccountTreeIcon from '@mui/icons-material/AccountTree';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyIconTieProps extends SvgIconProps {}
const MyIconTie = ({ ...props }: MyIconTieProps) => {
  console.log('My render');
  return <AccountTreeIcon {...props}></AccountTreeIcon>;
};
export default memo(MyIconTie, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
