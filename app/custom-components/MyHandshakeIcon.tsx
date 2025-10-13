import HandshakeIcon from '@mui/icons-material/Handshake';
import eq from 'lodash/eq';
import { memo } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
interface MyIconTieProps extends SvgIconProps {}
const MyIconTie = ({ ...props }: MyIconTieProps) => {
  // console.log('My render');
  return <HandshakeIcon {...props}></HandshakeIcon>;
};
export default memo(MyIconTie, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
