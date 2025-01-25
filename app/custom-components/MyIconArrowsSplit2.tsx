import { IconArrowsSplit2 } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconArrowsSplit2Props extends IconProps {}
const MyIconArrowsSplit2 = ({ ...props }: MyIconArrowsSplit2Props) => {
  console.log('My render');
  return <IconArrowsSplit2 {...props}></IconArrowsSplit2>;
};
export default memo(MyIconArrowsSplit2, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
