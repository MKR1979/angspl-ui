import { memo } from 'react';
import Fade, { FadeProps } from '@mui/material/Fade';
import eq from 'lodash/eq';

interface MyFadeProps extends FadeProps {}

const MyFade = ({ ...props }: MyFadeProps) => {
  console.log('MyFade rendered');
  return <Fade {...props} />;
};

export default memo(MyFade, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
