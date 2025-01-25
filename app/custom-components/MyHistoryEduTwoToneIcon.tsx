import HistoryEduTwoToneIcon from '@mui/icons-material/HistoryEduTwoTone';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyHistoryEduTwoToneIconProps extends SvgIconProps {}
const MyHistoryEduTwoToneIcon = ({ ...props }: MyHistoryEduTwoToneIconProps) => {
  console.log('MyHistoryEduTwoToneIcon render');
  return <HistoryEduTwoToneIcon {...props}></HistoryEduTwoToneIcon>;
};
export default memo(MyHistoryEduTwoToneIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
