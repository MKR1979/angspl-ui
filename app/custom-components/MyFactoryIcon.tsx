import FactoryIcon from '@mui/icons-material/Factory';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyFactoryIconProps extends SvgIconProps {}
const MyFactoryIcon = ({ ...props }: MyFactoryIconProps) => {
  // console.log('MyFactoryIcon render');
  return <FactoryIcon {...props}></FactoryIcon>;
};
export default memo(MyFactoryIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
