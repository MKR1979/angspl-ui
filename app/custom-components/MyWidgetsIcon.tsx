import WidgetsIcon from '@mui/icons-material/Widgets';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyWidgetsIconProps extends SvgIconProps {}
const MyWidgetsIcon = ({ ...props }: MyWidgetsIconProps) => {
//  console.log('My render');
  return <WidgetsIcon {...props}></WidgetsIcon>;
};
export default memo(MyWidgetsIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
