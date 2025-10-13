import { IconSortDescending } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconStackFrontProps extends IconProps {}
const MyIconSortDescending = ({ ...props }: MyIconStackFrontProps) => {
  //console.log('My render');
  return <IconSortDescending {...props}></IconSortDescending>;
};
export default memo(MyIconSortDescending, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
