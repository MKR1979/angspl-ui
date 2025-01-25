import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyMailTwoToneIconProps extends SvgIconProps {}
const MyMailTwoToneIcon = ({ ...props }: MyMailTwoToneIconProps) => {
  console.log('My render');
  return <MailTwoToneIcon {...props}></MailTwoToneIcon>;
};
export default memo(MyMailTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
