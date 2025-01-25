import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyDeleteTwoToneIconProps extends SvgIconProps {}
const MyDeleteTwoToneIcon = ({ ...props }: MyDeleteTwoToneIconProps) => {
  console.log('MyDeleteTwoToneIcon render');
  return <DeleteTwoToneIcon {...props}></DeleteTwoToneIcon>;
};
export default memo(MyDeleteTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
