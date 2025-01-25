import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyLocalShippingTwoToneIconProps extends SvgIconProps {}
const MyLocalShippingTwoToneIcon = ({ ...props }: MyLocalShippingTwoToneIconProps) => {
  console.log('MyDescriptionTwoToneIcon render');
  return <LocalShippingTwoToneIcon {...props}></LocalShippingTwoToneIcon>;
};
export default memo(MyLocalShippingTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
