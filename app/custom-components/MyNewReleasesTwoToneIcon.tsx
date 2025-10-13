import NewReleasesTwoToneIcon from '@mui/icons-material/NewReleasesTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyNewReleasesTwoToneIconProps extends SvgIconProps {}
const MyNewReleasesTwoToneIcon = ({ ...props }: MyNewReleasesTwoToneIconProps) => {
//  console.log('MyNewReleasesTwoToneIcon render');
  return <NewReleasesTwoToneIcon {...props}></NewReleasesTwoToneIcon>;
};
export default memo(MyNewReleasesTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
