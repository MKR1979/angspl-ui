import { memo } from 'react';
import Lightbox, { ILightBoxProps } from 'react-18-image-lightbox';
import eq from 'lodash/eq';

interface MyLightboxProps extends ILightBoxProps {
  href?: string;
}

const MyLightbox = ({ ...props }: MyLightboxProps) => {
  console.log('MyLightbox rendered');
  return <Lightbox {...props} />;
};

export default memo(MyLightbox, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
