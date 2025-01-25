'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useLeadSourceEntry from './useLeadSourceEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import LeadSourceDTO from '@/app/types/LeadSourceDTO';

type LeadSourceEntryProps = {
  dtoLeadSource: LeadSourceDTO;
};

const LeadSourceEntry = (props: LeadSourceEntryProps) => {
  const { state, onInputChange, onLeadSourceNameBlur, onSaveClick, onCancelClick } = useLeadSourceEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Lead Source Name"
              name="lead_source_name"
              value={state.dtoLeadSource.lead_source_name}
              onChange={onInputChange}
              onBlur={onLeadSourceNameBlur}
              error={state.errorMessages.lead_source_name ? true : false}
            />
            <MyTypography className="error"> {state.errorMessages.lead_source_name}</MyTypography>
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

export default memo(LeadSourceEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
