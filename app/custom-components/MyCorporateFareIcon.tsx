import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyCorporateFareIconProps extends SvgIconProps {}
const MyCorporateFareIcon = ({ ...props }: MyCorporateFareIconProps) => {
  console.log('MyCorporateFareIcon render');
  return <CorporateFareIcon {...props}></CorporateFareIcon>;
};
export default memo(MyCorporateFareIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
