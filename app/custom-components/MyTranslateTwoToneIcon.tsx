import TranslateTwoToneIcon from '@mui/icons-material/TranslateTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyTranslateTwoToneIconProps extends SvgIconProps {}
const MyTranslateTwoToneIcon = ({ ...props }: MyTranslateTwoToneIconProps) => {
  //console.log('MyTranslateTwoToneIcon render');
  return <TranslateTwoToneIcon {...props}></TranslateTwoToneIcon>;
};
export default memo(MyTranslateTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
