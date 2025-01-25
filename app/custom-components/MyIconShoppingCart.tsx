import { IconShoppingCart } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconShoppingCartProps extends IconProps {}
const MyIconShoppingCart = ({ ...props }: MyIconShoppingCartProps) => {
  console.log('My render');
  return <IconShoppingCart {...props}></IconShoppingCart>;
};
export default memo(MyIconShoppingCart, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
