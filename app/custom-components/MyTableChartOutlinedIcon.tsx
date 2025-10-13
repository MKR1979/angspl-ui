import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyTableChartOutlinedIconProps extends SvgIconProps {}
const MyTableChartOutlinedIcon = ({ ...props }: MyTableChartOutlinedIconProps) => {
// console.log('MyTableChartOutlinedIcon render');
  return <TableChartOutlinedIcon {...props}></TableChartOutlinedIcon>;
};
export default memo(MyTableChartOutlinedIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
