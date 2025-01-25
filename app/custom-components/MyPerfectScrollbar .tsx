import { memo } from 'react';
import PerfectScrollbar, { ScrollBarProps } from 'react-perfect-scrollbar';
import eq from 'lodash/eq';
import 'react-perfect-scrollbar/dist/css/styles.css';
interface MyPerfectScrollbarProps extends ScrollBarProps {}

const MyPerfectScrollbar = ({ children, ...props }: MyPerfectScrollbarProps) => {
  console.log('MyPerfectScrollbar  rendered');
  return <PerfectScrollbar {...props}> {children}</PerfectScrollbar>;
};

export default memo(MyPerfectScrollbar, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
