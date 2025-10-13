import { IconCurrencyDollar } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconCurrencyDollarProps extends IconProps {}
const MyIconCurrencyDollar = ({ ...props }: MyIconCurrencyDollarProps) => {
  //console.log('My render');
  return <IconCurrencyDollar {...props}></IconCurrencyDollar>;
};
export default memo(MyIconCurrencyDollar, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
