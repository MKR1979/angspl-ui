'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useCaseEntry from './useCaseEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import CaseDTO from '@/app/types/CaseDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';

type CaseEntryProps = {
  dtoCase: CaseDTO;
  arrAccountLookup: LookupDTO[];
  arrCasePriorityLookup: LookupDTO[];
  arrCaseStatusLookup: LookupDTO[];
  arrCaseStateLookup: LookupDTO[];
  arrCaseTypeLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const CaseEntry = (props: CaseEntryProps) => {
  const {
    state,
    onInputChange,
    onAccountNameChange,
    onStateChange,
    onCaseTypeNameChange,
    onPriorityChange,
    onStatusChange,
    onAssignedToNameChange,
    onPriorityBlur,
    onAccountNameBlur,
    onStateBlur,
    onStatusBlur,
    onCaseTypeNameBlur,
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
  } = useCaseEntry(props);

  return (
    <MyLocalizationProvider>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField label="Case Number" name="case_number" value={state.dtoCase.case_number} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ text: state.dtoCase.priority }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCasePriorityLookup}
                onChange={onPriorityChange}
                onBlur={onPriorityBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Priority"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onPriorityBlur}
                    error={state.errorMessages.priority ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.priority}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{ text: state.dtoCase.state }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCaseStateLookup}
                onChange={onStateChange}
                onBlur={onStateBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="State"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onStateBlur}
                    error={state.errorMessages.state ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.state}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ text: state.dtoCase.status }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCaseStatusLookup}
                onChange={onStatusChange}
                onBlur={onStatusBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Status"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onStatusBlur}
                    error={state.errorMessages.status ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.status}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ id: state.dtoCase.case_type_id, text: state.dtoCase.case_type_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCaseTypeLookup}
                onChange={onCaseTypeNameChange}
                onBlur={onCaseTypeNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Case Type"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onCaseTypeNameBlur}
                    error={state.errorMessages.case_type_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.case_type_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open5}
                onOpen={setOpen5}
                onClose={setClose5}
                value={{ id: state.dtoCase.account_id, text: state.dtoCase.account_name }}
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
              <MyTextField label="Subject" name="subject" value={state.dtoCase.subject} onChange={onInputChange} />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={5}
                label="Case Description"
                name="case_description"
                value={state.dtoCase.case_description}
                onChange={onInputChange}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={5}
                label="Resolution"
                name="resolution"
                value={state.dtoCase.resolution}
                onChange={onInputChange}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open6}
                onOpen={setOpen6}
                onClose={setClose6}
                value={{ id: state.dtoCase.assigned_to, text: state.dtoCase.assigned_to_user_name }}
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

export default memo(CaseEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
