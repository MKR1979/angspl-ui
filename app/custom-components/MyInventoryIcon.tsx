import InventoryIcon from '@mui/icons-material/Inventory';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyInventoryIconProps extends SvgIconProps {}
const MyInventoryIcon = ({ ...props }: MyInventoryIconProps) => {
  console.log('MyInventoryIcon render');
  return <InventoryIcon {...props}></InventoryIcon>;
};
export default memo(MyInventoryIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
