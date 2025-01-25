import { IconHome2 } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconHome2Props extends IconProps {}
const MyIconHome2 = ({ ...props }: MyIconHome2Props) => {
  console.log('My render');
  return <IconHome2 {...props}></IconHome2>;
};
export default memo(MyIconHome2, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
