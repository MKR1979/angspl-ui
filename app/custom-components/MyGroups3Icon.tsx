import Groups3Icon from '@mui/icons-material/Groups3';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyIconTieProps extends SvgIconProps {}
const MyIconTie = ({ ...props }: MyIconTieProps) => {
  // console.log('My render');
  return <Groups3Icon {...props}></Groups3Icon>;
};
export default memo(MyIconTie, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
