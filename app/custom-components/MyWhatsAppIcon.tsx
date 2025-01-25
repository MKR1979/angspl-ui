import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyWhatsAppIconProps extends SvgIconProps {}
const MyWhatsAppIcon = ({ ...props }: MyWhatsAppIconProps) => {
  console.log('MyAccountCircleIcon render');
  return <WhatsAppIcon {...props}></WhatsAppIcon>;
};
export default memo(MyWhatsAppIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
