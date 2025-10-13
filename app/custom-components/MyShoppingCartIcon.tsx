import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyShoppingCartIconProps extends SvgIconProps {}
const MyShoppingCartIcon = ({ ...props }: MyShoppingCartIconProps) => {
//  console.log('MyShoppingCartIcon render');
  return <ShoppingCartIcon {...props}></ShoppingCartIcon>;
};
export default memo(MyShoppingCartIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
