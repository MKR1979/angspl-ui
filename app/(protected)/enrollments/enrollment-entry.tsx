'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useEnrollmentEntry from './useEnrollmentEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import EnrollmentDTO from '@/app/types/EnrollmentDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import dayjs from 'dayjs';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import * as gConstants from '../../constants/constants';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import utc from 'dayjs/plugin/utc';
import { useSelector } from '../../store';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type EventEntryProps = {
  comingFrom?: string;
  onClosePopup?: () => void;
  dtoEnrollment: EnrollmentDTO;
};

const EventEntry = (props: EventEntryProps) => {
  const {
    state,
    onInputChange,
    onCourseNameChange,
    onStartDateTimeChange,
    onEndDateTimeChange,
    onUserNameChange,
    onUserNameBlur,
    onStartDateTimeBlur,
    onEndDateTimeBlur,
    onCourseNameBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onStatusChange,
    onStatusBlur,
    onPaidAmountBlur,
  } = useEnrollmentEntry(props);

  const { siteConfig } = useSelector((state: { siteConfigState: any; }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string; }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? 'MM/DD/YYYY';

  return (
    <MyLocalizationProvider>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open1}
                onOpen={setOpen1}
                onClose={setClose1}
                value={{
                  id: state.dtoEnrollment.user_id,
                  text: state.dtoEnrollment.user_name
                }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrUserLookup}
                onChange={onUserNameChange}
                onBlur={onUserNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="User "
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    // onBlur={onAssignedToNameBlur}
                    error={state.errorMessages.user_name ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.user_name}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open2}
                onOpen={setOpen2}
                onClose={setClose2}
                value={{
                  id: state.dtoEnrollment.course_id,
                  text: state.dtoEnrollment.course_name
                }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrCourseLookup}
                onChange={onCourseNameChange}
                onBlur={onCourseNameBlur}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Course"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    // onBlur={onLocationNameBlur}
                    error={state.errorMessages.course_id ? true : false}
                  />
                )}
              />
              <MyTypography className="error"> {state.errorMessages.course_id}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDatePicker
                label="Start Date"
                onChange={onStartDateTimeChange}
                value={
                  dayjs(state.dtoEnrollment.enrollment_date).tz(customerTimezone).format('MM/DD/YYYY') === '12/31/1899'
                    ? null
                    : dayjs(state.dtoEnrollment.enrollment_date).tz(customerTimezone).toDate()
                }
                disabled={state.dtoEnrollment.id > 0}
                onBlur={onStartDateTimeBlur}
                error={!!state.errorMessages.enrollment_date}
                minDate={dayjs().toDate()}
                maxDate={dayjs().add(gConstants.DOB_YEAR_NUM, gConstants.DOB_YEAR).toDate()}
              />
              <MyTypography className="error">{state.errorMessages.enrollment_date}</MyTypography>
            </MyGrid>

            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyDatePicker
                label="End Date"
                onChange={onEndDateTimeChange}
                value={
                  dayjs(state.dtoEnrollment.end_date).tz(customerTimezone).format('MM/DD/YYYY') === '12/31/1899'
                    ? null
                    : dayjs(state.dtoEnrollment.end_date).tz(customerTimezone).toDate()
                }
                onBlur={onEndDateTimeBlur}
                error={!!state.errorMessages.end_date}
                minDate={state.dtoEnrollment.enrollment_date
                  ? dayjs(state.dtoEnrollment.enrollment_date).tz(customerTimezone).toDate()
                  : dayjs().toDate()}
                maxDate={dayjs().add(gConstants.DOB_YEAR_NUM, gConstants.DOB_YEAR).toDate()}
              />
              <MyTypography className="error">{state.errorMessages.end_date}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyTextField
                label="Paid Amount"
                name="paid_amount"
                value={state.dtoEnrollment.paid_amount || ''}
                onChange={onInputChange}
                onBlur={onPaidAmountBlur}
                slotProps={{
                  input: {
                    inputComponent: MyNumericFormat as any,
                    inputProps: {
                      prefix: state.dtoEnrollment.currency_symbol,
                      maxLength: gConstants.FAMILY_SAMAGRA_ID_LENGTH,
                      pattern: "^[0-9]+(\\.[0-9]{1,2})?$"
                    }
                  }
                }}
              />
              <MyTypography className="error"> {state.errorMessages.paid_amount}</MyTypography>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open3}
                onOpen={setOpen3}
                onClose={setClose3}
                value={{ text: state.dtoEnrollment.status }}
                getOptionLabel={(option: any) => option.text}
                firstitem={{ id: 0, text: '' }}
                options={state.arrStatusLookup}
                onChange={onStatusChange}
                onBlur={onStatusBlur}
                filterOptions={(options, state) => {
                  // searchable Lookup
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Status"
                    placeholder='Select status...'
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                    onBlur={onStatusBlur}
                    error={state.errorMessages.status ? true : false}
                  />
                )}
              />
              <MyTypography className="error">{state.errorMessages.status}</MyTypography>
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

export default memo(EventEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
