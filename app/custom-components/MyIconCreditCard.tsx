import { IconCreditCard } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconCreditCardProps extends IconProps {}
const MyIconCreditCard = ({ ...props }: MyIconCreditCardProps) => {
  console.log('My render');
  return <IconCreditCard {...props}></IconCreditCard>;
};
export default memo(MyIconCreditCard, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
