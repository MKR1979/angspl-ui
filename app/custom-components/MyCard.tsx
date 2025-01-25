import { memo, ReactElement } from 'react';
import Card, { CardProps } from '@mui/material/Card';
import eq from 'lodash/eq';
import MyCardHeader from './MyCardHeader';

interface MyCardProps extends CardProps {
  title?: string;
  secondary?: ReactElement;
}

const MyCard = ({ children, ...props }: MyCardProps) => {
  console.log('MyCard rendered');
  return (
    <Card {...props}>
      {(props.secondary || props.title) && <MyCardHeader action={props.secondary} title={props.title} />} {children}
    </Card>
  );
};

export default memo(MyCard, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
