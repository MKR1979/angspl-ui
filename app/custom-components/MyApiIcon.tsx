import ApiIcon from '@mui/icons-material/Api';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyApiIconProps extends SvgIconProps {}
const MyApiIcon = ({ ...props }: MyApiIconProps) => {
  console.log('MyApiIcon render');
  return <ApiIcon {...props}></ApiIcon>;
};
export default memo(MyApiIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
