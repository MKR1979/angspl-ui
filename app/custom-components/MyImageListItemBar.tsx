import { memo } from 'react';
import ImageListItemBar, { ImageListItemBarProps } from '@mui/material/ImageListItemBar';
import eq from 'lodash/eq';

interface MyImageListItemBarProps extends ImageListItemBarProps {}

const MyImageListItemBar = ({ children, ...props }: MyImageListItemBarProps) => {
  console.log('MyImageListItemBar rendered');
  return <ImageListItemBar {...props}> {children}</ImageListItemBar>;
};

export default memo(MyImageListItemBar, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
