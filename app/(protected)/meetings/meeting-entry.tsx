'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useMeetingEntry from './useMeetingEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import MeetingDTO from '@/app/types/MeetingDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import LookupDTO from '@/app/types/LookupDTO';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import MyDateTimePicker from '@/app/custom-components/MyDateTimePicker';
import * as Constants from '../../(protected)/constants/constants';
import * as gConstants from '../../constants/constants';
import { useSelector } from '@/app/store';

type MeetingEntryProps = {
  dtoMeeting: MeetingDTO;
  arrLocationLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const MeetingEntry = (props: MeetingEntryProps) => {
  const {
    state,
    onInputChange,
    onMeetingStatusChange,
    onParentTypeChange,
    onParentTypeNameChange,
    onLocationNameChange,
    onReminderChange,
    onReminderBlur,
    onAssignedToNameChange,
    onStartDateTimeChange,
    onEndDateTimeChange,
    onSubjectBlur,
    onStartDateTimeBlur,
    onEndDateTimeBlur,
    onLocationNameBlur,
    onStatusBlur,
    //onParentTypeBlur,
    //onParentTypeNameBlur,
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
  } = useMeetingEntry(props);

  const { siteConfig } = useSelector((state: { siteConfigState: any; }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string; }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  return (
    <MyLocalizationProvider>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Subject"
                name="subject"
                value={state.dtoMeeting.subject}
                onChange={onInputChange}
                onBlur={onSubjectBlur}
                inputProps={{
                  maxLength: Constants.DOMAIN_NAME_LENGTH,
                  pattern: '^[a-zA-Z0-9]{1,2}$'
                }}
                error={state.errorMessages.subject ? true : false}
              />
              <MyTypography className="error"> {state.errorMessages.subject}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDateTimePicker
                label="Start Date"
                onChange={onStartDateTimeChange}
                onBlur={onStartDateTimeBlur}
                value={
                  dayjs(state.dtoMeeting.start_date_time).format('MM/DD/YYYY') === '12/31/1899' ? null : state.dtoMeeting.start_date_time
                }
                error={state.errorMessages.start_date_time ? true : false}

                minDate={dayjs().toDate()}
                maxDate={dayjs().add(gConstants.DOB_YEAR_NUM, gConstants.DOB_YEAR).toDate()}
              ></MyDateTimePicker>
              <MyTypography className="error"> {state.errorMessages.start_date_time}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDateTimePicker
                label="End Date"
                onChange={onEndDateTimeChange}
                onBlur={onEndDateTimeBlur}
                value={dayjs(state.dtoMeeting.end_date_time).format('MM/DD/YYYY') === '12/31/1899' ? null : state.dtoMeeting.end_date_time}
                error={state.errorMessages.end_date_time ? true : false}
                minDate={state.dtoMeeting.start_date_time
                  ? dayjs(state.dtoMeeting.start_date_time).tz(customerTimezone).toDate()
                  : dayjs().toDate()}
                maxDate={dayjs().add(gConstants.DOB_YEAR_NUM, gConstants.DOB_YEAR).toDate()}
              ></MyDateTimePicker>
              <MyTypography className="error"> {state.errorMessages.end_date_time}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{ id: state.dtoMeeting.location_id, text: state.dtoMeeting.location_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrLocationLookup}
                onChange={onLocationNameChange}
                onBlur={onLocationNameBlur}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
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
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{ text: state.dtoMeeting.reminder }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrReminderLookup}
                onChange={onReminderChange}
                onBlur={onReminderBlur}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Reminder"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onReminderBlur}
                    error={state.errorMessages.reminder ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.reminder}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ id: state.dtoMeeting.parent_type, text: state.dtoMeeting.parent_type }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrParentTypeLookup}
                onChange={onParentTypeChange}
                //onBlur={onParentTypeBlur}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Related To"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  //onBlur={onParentTypeBlur}
                  //error={state.errorMessages.parent_type ? true : false}
                  />
                )}
              />
              {/* <MyTypography className="error"> {state.errorMessages.parent_type}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ id: state.dtoMeeting.parent_type_id, text: state.dtoMeeting.parent_type_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrParentTypeNameLookup}
                onChange={onParentTypeNameChange}
                //onBlur={onParentTypeNameBlur}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Related To Option"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  //onBlur={onParentTypeNameBlur}
                  //error={state.errorMessages.parent_type_id ? true : false}
                  />
                )}
              />
              {/* <MyTypography className="error"> {state.errorMessages.parent_type_id}</MyTypography> */}
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open5}
                onOpen={setOpen5}
                onClose={setClose5}
                value={{ id: state.dtoMeeting.assigned_to, text: state.dtoMeeting.assigned_to_user_name }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrAssignedToLookup}
                onChange={onAssignedToNameChange}
                onBlur={onAssignedToNameBlur}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
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
              <MyAutocomplete
                open={state.open6}
                onOpen={setOpen6}
                onClose={setClose6}
                value={{ text: state.dtoMeeting.status }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ text: '' }}
                options={state.arrMeetingStausLookup}
                onChange={onMeetingStatusChange}
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
              <MyTextField
                multiline
                rows={5}
                label="Description"
                name="description"
                value={state.dtoMeeting.description}
                onChange={onInputChange}
              />
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

export default memo(MeetingEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
