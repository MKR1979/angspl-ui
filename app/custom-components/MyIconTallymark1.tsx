import { IconTallymark1 } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconTallymark1Props extends IconProps {}
const MyIconTallymark1 = ({ ...props }: MyIconTallymark1Props) => {
 // console.log('My render');
  return <IconTallymark1 {...props}></IconTallymark1>;
};
export default memo(MyIconTallymark1, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
