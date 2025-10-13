import { IconSearch } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconSearchProps extends IconProps {}
const MyIconSearch = ({ ...props }: MyIconSearchProps) => {
// console.log('My render');
  return <IconSearch {...props}></IconSearch>;
};
export default memo(MyIconSearch, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
