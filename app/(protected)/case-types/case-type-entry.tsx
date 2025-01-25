'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useCaseTypeEntry from './useCaseTypeEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import CaseTypeDTO from '@/app/types/CaseTypeDTO';

type CaseTypeEntryProps = {
  dtoCaseType: CaseTypeDTO;
};

const CaseTypeEntry = (props: CaseTypeEntryProps) => {
  const { state, onInputChange, onCaseTypeNameBlur, onSaveClick, onCancelClick } = useCaseTypeEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Case Type Name"
              name="case_type_name"
              value={state.dtoCaseType.case_type_name}
              onChange={onInputChange}
              onBlur={onCaseTypeNameBlur}
              error={state.errorMessages.case_type_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.case_type_name}</MyTypography>
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

export default memo(CaseTypeEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
