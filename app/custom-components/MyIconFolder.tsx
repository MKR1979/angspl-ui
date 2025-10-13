import { IconFolder } from '@tabler/icons-react';
import eq from 'lodash/eq';
import { memo } from 'react';
import { IconProps } from '@tabler/icons-react';
interface MyIconFolderProps extends IconProps {}
const MyIconFolder = ({ ...props }: MyIconFolderProps) => {
  //console.log('My render');
  return <IconFolder {...props}></IconFolder>;
};
export default memo(MyIconFolder, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
