import { IconAddressBook } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconAddressBookProps extends IconProps {}
const MyIconAddressBook = ({ ...props }: MyIconAddressBookProps) => {
  console.log('My render');
  return <IconAddressBook {...props}></IconAddressBook>;
};
export default memo(MyIconAddressBook, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
