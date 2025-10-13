import { memo } from 'react';
import ImageList, { ImageListProps } from '@mui/material/ImageList';
import eq from 'lodash/eq';

interface MyImageListProps extends ImageListProps {}

const MyImageList = ({ children, ...props }: MyImageListProps) => {
  //console.log('MyImageList rendered');
  return <ImageList {...props}> {children}</ImageList>;
};

export default memo(MyImageList, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
