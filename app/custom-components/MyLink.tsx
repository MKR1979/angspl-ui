import { CSSProperties, memo } from 'react';
import Link from 'next/link';
import { LinkProps } from 'next/link';
import eq from 'lodash/eq';

interface MyLinkProps extends LinkProps {
  id?: string;
  style?: CSSProperties | undefined;
  target?: string;
}

const MyLink = ({
  ...props
}: MyLinkProps & {
  children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>) => {
  //console.log('MyLink rendered');
  return <Link style={{ textDecoration: 'underline' }} as={props.href} {...props} />;
};

export default memo(MyLink, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
