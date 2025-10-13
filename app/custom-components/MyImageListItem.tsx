import { memo } from 'react';
import ImageListItem, { ImageListItemProps } from '@mui/material/ImageListItem';
import eq from 'lodash/eq';

interface MyImageListItemProps extends ImageListItemProps {}

const MyImageListItem = ({ children, ...props }: MyImageListItemProps) => {
  //console.log('MyImageListItem rendered');
  return <ImageListItem {...props}> {children}</ImageListItem>;
};

export default memo(MyImageListItem, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
