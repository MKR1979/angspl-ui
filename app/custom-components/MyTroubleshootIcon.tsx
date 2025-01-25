import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyTroubleshootIconProps extends SvgIconProps {}
const MyTroubleshootIcon = ({ ...props }: MyTroubleshootIconProps) => {
  console.log('MyTroubleshootIcon render');
  return <TroubleshootIcon {...props}></TroubleshootIcon>;
};
export default memo(MyTroubleshootIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
