import { IconHexagons } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconHexagonsProps extends IconProps {}
const MyIconHexagons = ({ ...props }: MyIconHexagonsProps) => {
  //console.log('My render');
  return <IconHexagons {...props}></IconHexagons>;
};
export default memo(MyIconHexagons, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
