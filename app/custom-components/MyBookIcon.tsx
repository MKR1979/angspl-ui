import BookIcon from '@mui/icons-material/Book';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyBookIcon extends SvgIconProps {}
const MyBookIcon = ({ ...props }: MyBookIcon) => {
  // console.log('MyBookIcon render');
  return <BookIcon {...props}></BookIcon>;
};
export default memo(MyBookIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
