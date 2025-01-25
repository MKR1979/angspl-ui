import WarehouseIcon from '@mui/icons-material/Warehouse';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyWarehouseIconProps extends SvgIconProps {}
const MyWarehouseIcon = ({ ...props }: MyWarehouseIconProps) => {
  console.log('MyWarehouseIcon render');
  return <WarehouseIcon {...props}></WarehouseIcon>;
};
export default memo(MyWarehouseIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
