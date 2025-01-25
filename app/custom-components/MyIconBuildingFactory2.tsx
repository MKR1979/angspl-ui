import { IconBuildingFactory2 } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconBuildingFactory2Props extends IconProps {}
const MyIconBuildingFactory2 = ({ ...props }: MyIconBuildingFactory2Props) => {
  console.log('My render');
  return <IconBuildingFactory2 {...props}></IconBuildingFactory2>;
};
export default memo(MyIconBuildingFactory2, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
