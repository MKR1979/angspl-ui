'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useTermEntry from './useTermEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import TermDTO from '@/app/types/TermDTO';

type TermEntryProps = {
  dtoTerm: TermDTO;
};

const TermEntry = (props: TermEntryProps) => {
  const { state, onInputChange, onTermDescriptionBlur, onTermCodeBlur, onSaveClick, onCancelClick } = useTermEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Term Code"
              name="term_code"
              value={state.dtoTerm.term_code}
              onChange={onInputChange}
              onBlur={onTermCodeBlur}
              error={state.errorMessages.term_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.term_code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Term Description"
              name="term_description"
              value={state.dtoTerm.term_description}
              onChange={onInputChange}
              onBlur={onTermDescriptionBlur}
              error={state.errorMessages.term_description ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.term_description}</MyTypography>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={state.saveDisabled}>
          Save
        </MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(TermEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
