'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useIncotermEntry from './useIncotermEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import IncotermDTO from '@/app/types/IncotermDTO';

type IncotermEntryProps = {
  dtoIncoterm: IncotermDTO;
};

const IncotermEntry = (props: IncotermEntryProps) => {
  const { state, onInputChange, onIncotermDescriptionBlur, onIncotermCodeBlur, onSaveClick, onCancelClick } = useIncotermEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Incoterm Code"
              name="incoterm_code"
              value={state.dtoIncoterm.incoterm_code}
              onChange={onInputChange}
              onBlur={onIncotermCodeBlur}
              error={state.errorMessages.incoterm_code ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.incoterm_code}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Incoterm Description"
              name="incoterm_description"
              value={state.dtoIncoterm.incoterm_description}
              onChange={onInputChange}
              onBlur={onIncotermDescriptionBlur}
              error={state.errorMessages.incoterm_description ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.incoterm_description}</MyTypography>
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

export default memo(IncotermEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
