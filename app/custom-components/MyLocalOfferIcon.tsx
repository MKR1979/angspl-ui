import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyLocalOfferIcon extends SvgIconProps {}
const MyLocalOfferIcon = ({ ...props }: MyLocalOfferIcon) => {
  //console.log('MyLocalOfferIcon render');
  return <LocalOfferIcon {...props}></LocalOfferIcon>;
};
export default memo(MyLocalOfferIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
