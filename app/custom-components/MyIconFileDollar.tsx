import { IconFileDollar } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconFileDollarProps extends IconProps {}
const MyIconFileDollar = ({ ...props }: MyIconFileDollarProps) => {
//  console.log('My render');
  return <IconFileDollar {...props}></IconFileDollar>;
};
export default memo(MyIconFileDollar, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
