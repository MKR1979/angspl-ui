import Flag from '@mui/icons-material/Flag';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyFlagIconProps extends SvgIconProps {}
const MyFlagIcon = ({ ...props }: MyFlagIconProps) => {
  console.log('MyFlagIcon render');
  return <Flag {...props}></Flag>;
};
export default memo(MyFlagIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
