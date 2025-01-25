import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyProductionQuantityLimitsIconProps extends SvgIconProps {}
const MyProductionQuantityLimitsIcon = ({ ...props }: MyProductionQuantityLimitsIconProps) => {
  console.log('MyProductionQuantityLimitsIcon render');
  return <ProductionQuantityLimitsIcon {...props}></ProductionQuantityLimitsIcon>;
};
export default memo(MyProductionQuantityLimitsIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
