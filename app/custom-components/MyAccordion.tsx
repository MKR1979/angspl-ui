import { memo } from 'react';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import eq from 'lodash/eq';

interface MyAccordionProps extends AccordionProps {}

const MyAccordion = ({ children, ...props }: MyAccordionProps) => {
  console.log('MyAccordion rendered');
  return <Accordion {...props}> {children}</Accordion>;
};

export default memo(MyAccordion, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
