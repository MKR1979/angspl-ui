import { IconTruckDelivery } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconTruckDeliveryProps extends IconProps {}
const MyIconTruckDelivery = ({ ...props }: MyIconTruckDeliveryProps) => {
  console.log('My render');
  return <IconTruckDelivery {...props}></IconTruckDelivery>;
};
export default memo(MyIconTruckDelivery, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
