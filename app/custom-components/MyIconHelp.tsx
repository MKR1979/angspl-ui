import { IconHelp } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconHelpProps extends IconProps {}
const MyIconHelp = ({ ...props }: MyIconHelpProps) => {
  console.log('My render');
  return <IconHelp {...props}></IconHelp>;
};
export default memo(MyIconHelp, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
