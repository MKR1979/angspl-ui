import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyCropPortraitIconProps extends SvgIconProps {}
const MyCropPortraitIcon = ({ ...props }: MyCropPortraitIconProps) => {
  console.log('MyCropPortraitIcon render');
  return <CropPortraitIcon {...props}></CropPortraitIcon>;
};
export default memo(MyCropPortraitIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
