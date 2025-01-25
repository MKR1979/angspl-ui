'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useOpportunityEntry from './useOpportunityEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import OpportunityDTO from '@/app/types/OpportunityDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import { getLocalTime } from '@/app/common/Configuration';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';

type OpportunityEntryProps = {
  dtoOpportunity: OpportunityDTO;
  arrAccountLookup: LookupDTO[];
  arrCurrencyLookup: LookupDTO[];
  arrStageLookup: LookupDTO[];
  arrOpportunityTypeLookup: LookupDTO[];
  arrLeadSourceLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const OpportunityEntry = (props: OpportunityEntryProps) => {
  const {
    state,
    onInputChange,
    onAccountNameChange,
    onCurrencyNameChange,
    onStageNameChange,
    onOpportunityTypeNameChange,
    onLeadSourceNameChange,
    onAssignedToNameChange,
    onExpectedCloseDateChange,
    onOpportunityNameBlur,
    onAccountNameBlur,
    onStageNameBlur,
    onOpportunityTypeNameBlur,
    onAssignedToNameBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    setOpen5,
    setClose5,
    setOpen6,
    setClose6
  } = useOpportunityEntry(props);

  return (
    <MyLocalizationProvider>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Opportunity Name"
                name="opportunity_name"
                value={state.dtoOpportunity.opportunity_name}
                onChange={onInputChange}
                onBlur={onOpportunityNameBlur}
                error={state.errorMessages.opportunity_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.opportunity_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ id: state.dtoOpportunity.account_id, text: state.dtoOpportunity.account_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrAccountLookup}
                onChange={onAccountNameChange}
                onBlur={onAccountNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Account Name"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onAccountNameBlur}
                    error={state.errorMessages.account_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.account_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{ id: state.dtoOpportunity.currency_id, text: state.dtoOpportunity.currency_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCurrencyLookup}
                onChange={onCurrencyNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Currency"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Amount"
                name="amount"
                value={state.dtoOpportunity.amount}
                onChange={onInputChange}
                slotProps={{
                  input: {
                    inputComponent: MyNumericFormat as any
                  }
                }}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDatePicker
                label="Expected Close Date"
                onChange={onExpectedCloseDateChange}
                value={
                  dayjs(getLocalTime(state.dtoOpportunity.expected_close_date)).format('MM/DD/YYYY') === '12/31/1899'
                    ? null
                    : dayjs(getLocalTime(state.dtoOpportunity.expected_close_date)).toDate()
                }
              ></MyDatePicker>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ id: state.dtoOpportunity.stage_id, text: state.dtoOpportunity.stage_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrStageLookup}
                onChange={onStageNameChange}
                onBlur={onStageNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Stage"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onStageNameBlur}
                    error={state.errorMessages.stage_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.stage_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ id: state.dtoOpportunity.opportunity_type_id, text: state.dtoOpportunity.opportunity_type_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrOpportunityTypeLookup}
                onChange={onOpportunityTypeNameChange}
                onBlur={onOpportunityTypeNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Opportunity Type"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onOpportunityTypeNameBlur}
                    error={state.errorMessages.opportunity_type_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.opportunity_type_id}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Probability(%)" name="probability" value={state.dtoOpportunity.probability} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open5}
                onOpen={setOpen5}
                onClose={setClose5}
                value={{ id: state.dtoOpportunity.lead_source_id, text: state.dtoOpportunity.lead_source_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrLeadSourceLookup}
                onChange={onLeadSourceNameChange}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Lead Source"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Next Step" name="next_step" value={state.dtoOpportunity.next_step} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={5}
                label="Description"
                name="description"
                value={state.dtoOpportunity.description}
                onChange={onInputChange}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open6}
                onOpen={setOpen6}
                onClose={setClose6}
                value={{ id: state.dtoOpportunity.assigned_to, text: state.dtoOpportunity.assigned_to_user_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrAssignedToLookup}
                onChange={onAssignedToNameChange}
                onBlur={onAssignedToNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Assigned To"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onAssignedToNameBlur}
                    error={state.errorMessages.assigned_to ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.assigned_to}</MyTypography>
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
    </MyLocalizationProvider>
  );
};

export default memo(OpportunityEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
