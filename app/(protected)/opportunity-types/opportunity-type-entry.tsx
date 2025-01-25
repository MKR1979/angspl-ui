'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useOpportunityTypeEntry from './useOpportunityTypeEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import OpportunityTypeDTO from '@/app/types/OpportunityTypeDTO';

type OpportunityTypeEntryProps = {
  dtoOpportunityType: OpportunityTypeDTO;
};

const OpportunityTypeEntry = (props: OpportunityTypeEntryProps) => {
  const { state, onInputChange, onOpportunityTypeNameBlur, onSaveClick, onCancelClick } = useOpportunityTypeEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Opportunity Type Name"
              name="opportunity_type_name"
              value={state.dtoOpportunityType.opportunity_type_name}
              onChange={onInputChange}
              onBlur={onOpportunityTypeNameBlur}
              error={state.errorMessages.opportunity_type_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.opportunity_type_name}</MyTypography>
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

export default memo(OpportunityTypeEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
