import HistoryIcon from '@mui/icons-material/History';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyHistoryIconProps extends SvgIconProps {}
const MyHistoryIcon = ({ ...props }: MyHistoryIconProps) => {
  // console.log('MyHistoryIcon render');
  return <HistoryIcon {...props}></HistoryIcon>;
};
export default memo(MyHistoryIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
