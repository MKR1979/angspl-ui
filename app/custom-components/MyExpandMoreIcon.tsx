import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyExpandMoreIconProps extends SvgIconProps {}
const MyExpandMoreIcon = ({ ...props }: MyExpandMoreIconProps) => {
  // console.log('MyPrintIcon render');
  return <ExpandMoreIcon {...props}></ExpandMoreIcon>;
};
export default memo(MyExpandMoreIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
