'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useEventEntry from './useEventEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import EventDTO from '@/app/types/EventDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';
import MyDateTimePicker from '@/app/custom-components/MyDateTimePicker';

type EventEntryProps = {
  comingFrom?: string;
  onClosePopup?: () => void;
  dtoEvent: EventDTO;
  arrCurrencyLookup: LookupDTO[];
  arrLocationLookup: LookupDTO[];
  arrEmailTemplateLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const EventEntry = (props: EventEntryProps) => {
  const {
    state,
    onInputChange,
    onCurrencyNameChange,
    onLocationNameChange,
    onStartDateTimeChange,
    onEndDateTimeChange,
    onAssignedToNameChange,
    onEventNameBlur,
    onStartDateTimeBlur,
    onEndDateTimeBlur,
    onCurrencyNameBlur,
    onLocationNameBlur,
    onAssignedToNameBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3
  } = useEventEntry(props);

  return (
    <MyLocalizationProvider>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Event Name"
                name="event_name"
                value={state.dtoEvent.event_name}
                onChange={onInputChange}
                onBlur={onEventNameBlur}
                error={state.errorMessages.event_name ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.event_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDateTimePicker
                label="Start Time"
                onChange={onStartDateTimeChange}
                onBlur={onStartDateTimeBlur}
                value={dayjs(state.dtoEvent.start_date_time).format('MM/DD/YYYY') === '12/31/1899' ? null : state.dtoEvent.start_date_time}
              ></MyDateTimePicker>
              <MyTypography className="error"> {state.errorMessages.start_date_time}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDateTimePicker
                label="End Time"
                onChange={onEndDateTimeChange}
                onBlur={onEndDateTimeBlur}
                value={dayjs(state.dtoEvent.end_date_time).format('MM/DD/YYYY') === '12/31/1899' ? null : state.dtoEvent.end_date_time}
              ></MyDateTimePicker>
              <MyTypography className="error"> {state.errorMessages.end_date_time}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ id: state.dtoEvent.currency_id, text: state.dtoEvent.currency_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCurrencyLookup}
                onChange={onCurrencyNameChange}
                onBlur={onCurrencyNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Currency"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onCurrencyNameBlur}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.currency_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Budget"
                name="budget"
                value={state.dtoEvent.budget}
                onChange={onInputChange}
                slotProps={{
                  input: {
                    inputComponent: MyNumericFormat as any,
                    inputProps: { prefix: state.dtoEvent.currency_symbol }
                  }
                }}
              />
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{ id: state.dtoEvent.location_id, text: state.dtoEvent.location_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrLocationLookup}
                onChange={onLocationNameChange}
                onBlur={onLocationNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Location"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onLocationNameBlur}
                    error={state.errorMessages.location_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.location_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ id: state.dtoEvent.assigned_to, text: state.dtoEvent.assigned_to_user_name }}
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
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                multiline
                rows={5}
                label="Description"
                name="description"
                value={state.dtoEvent.description}
                onChange={onInputChange}
              />
            </MyGrid>
            {/* <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ id: state.dtoEvent.email_template_id, text: state.dtoEvent.email_template_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrEmailTemplateLookup}
                onChange={onEmailTemplateNameChange}
                onBlur={onEmailTemplateNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="E-Mail Template"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onEmailTemplateNameBlur}
                    error={state.errorMessages.email_template_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.email_template_id}</MyTypography>
            </MyGrid> */}
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

export default memo(EventEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
