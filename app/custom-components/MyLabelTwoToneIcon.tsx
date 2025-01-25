import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyLabelTwoToneIconProps extends SvgIconProps {}
const MyLabelTwoToneIcon = ({ ...props }: MyLabelTwoToneIconProps) => {
  console.log('MyLabelTwoToneIcon render');
  return <LabelTwoToneIcon {...props}></LabelTwoToneIcon>;
};
export default memo(MyLabelTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
