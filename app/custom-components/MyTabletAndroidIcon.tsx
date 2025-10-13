import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyIconTieProps extends SvgIconProps {}
const MyIconTie = ({ ...props }: MyIconTieProps) => {
  //console.log('My render');
  return <TabletAndroidIcon {...props}></TabletAndroidIcon>;
};
export default memo(MyIconTie, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
