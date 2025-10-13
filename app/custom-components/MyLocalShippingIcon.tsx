import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyIconTieProps extends SvgIconProps {}
const MyIconTie = ({ ...props }: MyIconTieProps) => {
 // console.log('My render');
  return <LocalShippingIcon {...props}></LocalShippingIcon>;
};
export default memo(MyIconTie, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
