import ForumIcon from '@mui/icons-material/Forum';
import eq from 'lodash/eq';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
interface MyForumIcon extends SvgIconProps {}
const MyForumIcon = ({ ...props }: MyForumIcon) => {
  console.log('MyForumIcon render');
  return <ForumIcon {...props}></ForumIcon>;
};
export default memo(MyForumIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
