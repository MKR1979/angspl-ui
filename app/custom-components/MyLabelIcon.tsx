import Label from '@mui/icons-material/Label';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyLabelIconProps extends SvgIconProps {}
const MyLabelIcon = ({ ...props }: MyLabelIconProps) => {
  console.log('MyLabelIcon render');
  return <Label {...props}></Label>;
};
export default memo(MyLabelIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
