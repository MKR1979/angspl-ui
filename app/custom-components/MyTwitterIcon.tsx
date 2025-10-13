import TwitterIcon from '@mui/icons-material/Twitter';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyTwitterIconProps extends SvgIconProps {}
const MyTwitterIcon = ({ ...props }: MyTwitterIconProps) => {
 // console.log('MyTwitterIcon render');
  return <TwitterIcon {...props}></TwitterIcon>;
};
export default memo(MyTwitterIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
