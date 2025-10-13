import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyDescriptionTwoToneIconProps extends SvgIconProps {}
const MyDescriptionTwoToneIcon = ({ ...props }: MyDescriptionTwoToneIconProps) => {
  // console.log('MyDescriptionTwoToneIcon render');
  return <DescriptionTwoToneIcon {...props}></DescriptionTwoToneIcon>;
};
export default memo(MyDescriptionTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
