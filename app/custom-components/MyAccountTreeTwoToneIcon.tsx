import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyAccountTreeTwoToneIcon extends SvgIconProps {}
const MyAccountTreeTwoToneIcon = ({ ...props }: MyAccountTreeTwoToneIcon) => {
  // console.log('MyAccountTreeTwoToneIcon render');
  return <AccountTreeTwoToneIcon {...props}></AccountTreeTwoToneIcon>;
};
export default memo(MyAccountTreeTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
