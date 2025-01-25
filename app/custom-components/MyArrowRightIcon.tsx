import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyArrowRightIcon extends SvgIconProps {}
const MyArrowRightIcon = ({ ...props }: MyArrowRightIcon) => {
  console.log('MyArrowRightIcon render');
  return <ArrowRightIcon {...props}></ArrowRightIcon>;
};
export default memo(MyArrowRightIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
