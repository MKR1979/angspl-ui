import { IconFileLike } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconFileLikeProps extends IconProps {}
const MyIconFileLike = ({ ...props }: MyIconFileLikeProps) => {
  console.log('My render');
  return <IconFileLike {...props}></IconFileLike>;
};
export default memo(MyIconFileLike, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
