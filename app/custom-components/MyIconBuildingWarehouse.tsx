import { IconBuildingWarehouse } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconBuildingWarehouseProps extends IconProps {}
const MyIconBuildingWarehouse = ({ ...props }: MyIconBuildingWarehouseProps) => {
  console.log('My render');
  return <IconBuildingWarehouse {...props}></IconBuildingWarehouse>;
};
export default memo(MyIconBuildingWarehouse, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
