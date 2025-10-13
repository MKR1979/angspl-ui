import { IconBrandDribbble } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconBrandDribbbleProps extends IconProps {}
const MyIconBrandDribbble = ({ ...props }: MyIconBrandDribbbleProps) => {
  //console.log('My render');
  return <IconBrandDribbble {...props}></IconBrandDribbble>;
};
export default memo(MyIconBrandDribbble, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
