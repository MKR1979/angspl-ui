import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyChevronRightIconProps extends SvgIconProps {}
const MyChevronRightIcon = ({ ...props }: MyChevronRightIconProps) => {
  console.log('MyChevronRightIcon render');
  return <ChevronRightIcon {...props}></ChevronRightIcon>;
};
export default memo(MyChevronRightIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
