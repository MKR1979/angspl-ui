import NumbersIcon from '@mui/icons-material/Numbers';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyNumbersIconProps extends SvgIconProps {}
const MyNumbersIcon = ({ ...props }: MyNumbersIconProps) => {
  console.log('MyNumbersIcon render');
  return <NumbersIcon {...props}></NumbersIcon>;
};
export default memo(MyNumbersIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
