import { memo } from 'react';
import AccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import eq from 'lodash/eq';

interface MyAccordionDetailsProps extends AccordionDetailsProps {}

const MyAccordionDetails = ({ children, ...props }: MyAccordionDetailsProps) => {
  console.log('MyAccordionDetails rendered');
  return <AccordionDetails {...props}> {children}</AccordionDetails>;
};

export default memo(MyAccordionDetails, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
