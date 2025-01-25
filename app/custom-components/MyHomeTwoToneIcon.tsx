import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyHomeTwoToneIconProps extends SvgIconProps {}
const MyHomeTwoToneIcon = ({ ...props }: MyHomeTwoToneIconProps) => {
  console.log('MyHomeTwoToneIcon render');
  return <HomeTwoToneIcon {...props}></HomeTwoToneIcon>;
};
export default memo(MyHomeTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
