import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MySendTwoToneIconProps extends SvgIconProps {}
const MySendTwoToneIcon = ({ ...props }: MySendTwoToneIconProps) => {
  console.log('MySendTwoToneIcon render');
  return <SendTwoToneIcon {...props}></SendTwoToneIcon>;
};
export default memo(MySendTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
