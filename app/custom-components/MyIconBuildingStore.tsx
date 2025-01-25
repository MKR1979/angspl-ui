import { IconBuildingStore } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconBuildingStoreProps extends IconProps {}
const MyIconBuildingStore = ({ ...props }: MyIconBuildingStoreProps) => {
  console.log('My render');
  return <IconBuildingStore {...props}></IconBuildingStore>;
};
export default memo(MyIconBuildingStore, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
