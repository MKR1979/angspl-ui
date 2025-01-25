import { memo } from 'react';
import AccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import eq from 'lodash/eq';

interface MyAccordionSummaryProps extends AccordionSummaryProps {}

const MyAccordionSummary = ({ children, ...props }: MyAccordionSummaryProps) => {
  console.log('MyAccordionSummary rendered');
  return <AccordionSummary {...props}> {children}</AccordionSummary>;
};

export default memo(MyAccordionSummary, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
