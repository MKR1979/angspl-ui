import { IconPhoto } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconPhotoProps extends IconProps {}
const MyIconPhoto = ({ ...props }: MyIconPhotoProps) => {
  console.log('My render');
  return <IconPhoto {...props}></IconPhoto>;
};
export default memo(MyIconPhoto, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
