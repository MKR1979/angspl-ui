import LabelImportantTwoToneIcon from '@mui/icons-material/LabelImportantTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyLabelImportantTwoToneIconProps extends SvgIconProps {}
const MyLabelImportantTwoToneIcon = ({ ...props }: MyLabelImportantTwoToneIconProps) => {
  //console.log('MyLabelImportantTwoToneIcon render');
  return <LabelImportantTwoToneIcon {...props}></LabelImportantTwoToneIcon>;
};
export default memo(MyLabelImportantTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
