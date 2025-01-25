import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyStarTwoToneIconProps extends SvgIconProps {}
const MyStarTwoToneIcon = ({ ...props }: MyStarTwoToneIconProps) => {
  console.log('MyStarTwoToneIcon render');
  return <StarTwoToneIcon {...props}></StarTwoToneIcon>;
};
export default memo(MyStarTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
