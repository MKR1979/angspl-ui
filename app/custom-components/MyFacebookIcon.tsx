import FacebookIcon from '@mui/icons-material/Facebook';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyFacebookIconProps extends SvgIconProps {}
const MyFacebookIcon = ({ ...props }: MyFacebookIconProps) => {
  console.log('MyFacebookIcon render');
  return <FacebookIcon {...props}></FacebookIcon>;
};
export default memo(MyFacebookIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
