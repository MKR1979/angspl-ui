import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyMenuRoundedIconProps extends SvgIconProps {}
const MyMenuRoundedIcon = ({ ...props }: MyMenuRoundedIconProps) => {
  console.log('MyMenuRoundedIcon render');
  return <MenuRoundedIcon {...props}></MenuRoundedIcon>;
};
export default memo(MyMenuRoundedIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
