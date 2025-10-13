import AdsClickIcon from '@mui/icons-material/AdsClick';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyAdsClickIconProps extends SvgIconProps {}
const MyAdsClickIcon = ({ ...props }: MyAdsClickIconProps) => {
  // console.log('MyAdsClickIcon render');
  return <AdsClickIcon {...props}></AdsClickIcon>;
};
export default memo(MyAdsClickIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
