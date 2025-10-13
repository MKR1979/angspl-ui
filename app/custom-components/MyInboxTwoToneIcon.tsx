import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyInboxTwoToneIconProps extends SvgIconProps {}
const MyInboxTwoToneIcon = ({ ...props }: MyInboxTwoToneIconProps) => {
 // console.log('My render');
  return <InboxTwoToneIcon {...props}></InboxTwoToneIcon>;
};
export default memo(MyInboxTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
