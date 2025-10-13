import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyCheckCircleIconProps extends SvgIconProps {}
const MyCheckCircleIcon = ({ ...props }: MyCheckCircleIconProps) => {
  // console.log('MyCheckCircleIcon render');
  return <CheckCircleIcon {...props}></CheckCircleIcon>;
};
export default memo(MyCheckCircleIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
