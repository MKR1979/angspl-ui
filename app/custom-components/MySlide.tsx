import { memo } from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import eq from 'lodash/eq';

interface MySlideProps extends SlideProps {}

const MySlide = ({ ...props }: MySlideProps) => {
  console.log('MySlide rendered');
  return <Slide {...props} />;
};

export default memo(MySlide, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
