import Folder from '@mui/icons-material/Folder';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyFolderIconProps extends SvgIconProps {}
const MyFolderIcon = ({ ...props }: MyFolderIconProps) => {
  console.log('MyFolderIcon render');
  return <Folder {...props}></Folder>;
};
export default memo(MyFolderIcon, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
