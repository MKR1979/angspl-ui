'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useFeeCollectionEntry from './useFeeCollectionEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import FeeCollectionDTO from '@/app/types/FeeCollectionDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import * as gConstants from '../../../constants/constants';
import { arrFeeCollectionType } from '@/app/common/Configuration';
import { InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonIcon from '@mui/icons-material/Person';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { getLocalTime } from '@/app/common/Configuration';
import MyDatePicker from '@/app/custom-components/MyDatePicker';
import dayjs from 'dayjs';
import PaymentReceipt from '../../../custom-components/payment-receipt/MyPaymentReceipt';
import MyLocalizationProvider from '@/app/custom-components/MyLocalizationProvider';
import { arrFeePaymentFrequencyMonthly } from '@/app/common/Configuration';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

type FeePaymentEntryProps = {
  dtoFeeCollection: FeeCollectionDTO;
};

const FeeCollectionEntry = (props: FeePaymentEntryProps) => {
  const {
    state,
    saving,
    submitted,
    onInputChange,
    onSaveClick,
    onClearClick,
    onCancelClick,
    onPaymentModeBlur,
    onPaymentModeChange,
    onAmountBlur,
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
    setClose6,
    setOpen7,
    setClose7,
    onCourseBlur,
    onStudentBlur,
    onCourseChange,
    onStudentNameChange,
    onStatusChange,
    onStatusBlur,
    onAmountChange,
    onPaymentDateChange,
    onPaymentDateBlur,
    onChequeNoBlur,
    onChequeNoChange,
    onFeeMonthBlur,
    onFeeMonthChange,
    onFeeYearBlur,
    onFeeYearChange, onFeeHeadBlur, onFeeHeadChange
  } = useFeeCollectionEntry(props);

  return (
    <>
      {submitted ? (
        <PaymentReceipt
          course_name={state.dtoReceipt.course_name}
          learner_id={state.dtoReceipt.learner_id ?? 0}
          student_name={state.dtoReceipt.student_name}
          receipt_number={state.dtoReceipt.receipt_number}
          payment_date={state.dtoReceipt.payment_date}
          payment_mode={state.dtoReceipt.payment_mode}
          cheque_number={state.dtoReceipt.cheque_number}
          fee_head={state.dtoReceipt.fee_head}
          fee_amount={state.dtoReceipt.fee_amount}
          remarks={state.dtoReceipt.remarks}
          status={state.dtoReceipt.status}
        />
      ) : (
        <MyCard>
          <MyLocalizationProvider>
            <MyCardContent>
              <MyGrid container spacing={2}>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open1}
                    onOpen={setOpen1}
                    onClose={setClose1}
                    value={{
                      id: state.dtoFeeCollection.course_id,
                      text: state.dtoFeeCollection.course_name
                    }}
                    getOptionLabel={(option: any) => option?.text ?? ''}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrCourseLookup}
                    onChange={onCourseChange}
                    onBlur={onCourseBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Course"
                        placeholder="Select Course..."
                        error={state.errorMessages.course_name ? true : false}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <MenuBookIcon fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.course_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open2}
                    onOpen={setOpen2}
                    onClose={setClose2}
                    value={{
                      id: state.dtoFeeCollection.learner_id,
                      text: state.dtoFeeCollection.student_name
                    }}
                    getOptionLabel={(option: any) => option?.text ?? ''}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrUserLookup}
                    onChange={onStudentNameChange}
                    onBlur={onStudentBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Student"
                        placeholder="Select Student..."
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.student_name ? true : false}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.student_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyDatePicker
                    label="Payment Date"
                    onChange={onPaymentDateChange}
                    value={
                      dayjs(getLocalTime(state.dtoFeeCollection.payment_date)).format('MM/DD/YYYY') === '12/31/1899'
                        ? null
                        : dayjs(getLocalTime(state.dtoFeeCollection.payment_date)).toDate()
                    }
                    onBlur={onPaymentDateBlur}
                    error={state.errorMessages.payment_date ? true : false}
                    shouldDisableDate={(date) => {
                      const today = dayjs(); // current date
                      const oneWeekAgo = today.subtract(gConstants.ADMISSION_DATE_TILL_DAYS, 'day');
                      const selected = dayjs(date);
                      return selected.isBefore(oneWeekAgo, 'day') || selected.isAfter(today, 'day');
                    }}
                  />
                  <MyTypography className="error">{state.errorMessages.payment_date}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open3}
                    onOpen={setOpen3}
                    onClose={setClose3}
                    value={{ text: state.dtoFeeCollection.payment_mode }}
                    getOptionLabel={(option: any) => option?.text ?? ''}
                    firstitem={{ id: 0, text: '' }}
                    options={arrFeeCollectionType}
                    onChange={onPaymentModeChange}
                    onBlur={onPaymentModeBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Payment Mode"
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.payment_mode ? true : false}
                        placeholder="e.g. Cheque, Cash, Online"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <ScheduleIcon fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  <MyTypography className="error">{state.errorMessages.payment_mode}</MyTypography>
                </MyGrid>
                {state.dtoFeeCollection.payment_mode?.toLowerCase() === 'cheque' && (
                  <MyGrid size={{ xs: 12, sm: 6 }}>
                    <MyTextField
                      label="Cheque Number"
                      name="cheque_number"
                      value={state.dtoFeeCollection.cheque_number}
                      onChange={onChequeNoChange}
                      placeholder="Cheque No..."
                      onBlur={onChequeNoBlur}
                      inputProps={{
                        maxLength: gConstants.CGPA_HIGHEST,
                        inputMode: 'numeric',
                        pattern: '[0-9]*'
                      }}
                      error={!!state.errorMessages.cheque_number}
                    />
                    <MyTypography className="error">{state.errorMessages.cheque_number}</MyTypography>
                  </MyGrid>
                )}
                {/* <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Payment Type"
                    name="payment_type"
                    value={state.dtoFeeCollection.payment_type}
                    onChange={onInputChange}
                    placeholder="Eg. Annual Fee/ Tuestion Fee"
                    inputProps={{
                      maxLength: gConstants.EMAIL_LENGTH,
                      pattern: '^[A-Za-z]{1,2}$'
                    }}
                  />
                </MyGrid> */}
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open7}
                    onOpen={setOpen7}
                    onClose={setClose7}
                    value={{
                      id: state.dtoFeeCollection.fee_head_id,
                      text: state.dtoFeeCollection.fee_head
                    }}
                    getOptionLabel={(option: any) => option?.text ?? ''}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrFeeHeadLookup}
                    onChange={onFeeHeadChange}
                    onBlur={onFeeHeadBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Fee Head"
                        placeholder="Eg. Annual Fee/ Tuestion Fee"
                        error={state.errorMessages.fee_head ? true : false}
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <MenuBookIcon fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.fee_head}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Amount"
                    name="fee_amount"
                    placeholder="Enter amount"
                    value={state.dtoFeeCollection.fee_amount || ''}
                    onChange={onAmountChange}
                    onBlur={onAmountBlur}
                    error={state.errorMessages.fee_amount ? true : false}
                    slotProps={{
                      input: {
                        inputComponent: MyNumericFormat as any,
                        inputProps: {
                          maxLength: gConstants.FAMILY_SAMAGRA_ID_LENGTH,
                          pattern: '^[0-9]+(\\.[0-9]{1,2})?$'
                        }
                      }
                    }}
                  />
                  <MyTypography className="error"> {state.errorMessages.fee_amount}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open4}
                    onOpen={setOpen4}
                    onClose={setClose4}
                    value={{ text: state.dtoFeeCollection.fee_month }}
                    getOptionLabel={(option: any) => option?.text ?? ''}
                    firstitem={{ text: '' }}
                    options={arrFeePaymentFrequencyMonthly}
                    onChange={onFeeMonthChange}
                    onBlur={onFeeMonthBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Payment Month"
                        slotProps={{ inputLabel: { shrink: true } }}
                        error={!!state.errorMessages.fee_month}
                        placeholder="e.g. Select Month"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <ScheduleIcon fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                  <MyTypography className="error">{state.errorMessages.fee_month}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open5}
                    onOpen={setOpen5}
                    onClose={setClose5}
                    value={state.arrSessionYearLookup.find((opt: any) => opt.text === String(state.dtoFeeCollection.fee_year)) || null}
                    //value={state.dtoFeeCollection.fee_year}
                    getOptionLabel={(option: any) => option.text}
                    firstitem={{ id: 0, text: '' }}
                    options={state.arrSessionYearLookup}
                    onChange={onFeeYearChange}
                    onBlur={onFeeYearBlur}
                    filterOptions={(options, state) => {
                      const searchTerm = state.inputValue.toLowerCase();
                      return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                    }}
                    renderInput={(params) => (
                      <MyTextField
                        {...params}
                        label="Fee Year"
                        placeholder="Select Year..."
                        slotProps={{
                          inputLabel: { shrink: true }
                        }}
                        error={state.errorMessages.fee_year ? true : false}
                      />
                    )}
                  />
                  <MyTypography className="error"> {state.errorMessages.fee_year}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Remarks"
                    name="remarks"
                    value={state.dtoFeeCollection.remarks}
                    onChange={onInputChange}
                    placeholder="Enter Remark"
                    inputProps={{
                      maxLength: gConstants.PERCENTAGE_HIGHEST, // Restricts input to two characters
                      pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                    }}
                  />
                </MyGrid>
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyAutocomplete
                    open={state.open6}
                    onOpen={setOpen6}
                    onClose={setClose6}
                    value={{ text: state.dtoFeeCollection.status }}
                    // getOptionLabel={(option: any) => option.text}
                    getOptionLabel={(option: any) => option?.text ?? ''}
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
                        placeholder="Select status..."
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
              <MyDivider sx={{ my: 2 }} />
              <MyCardActions>
                <MyButton onClick={onSaveClick} disabled={saving} startIcon={<AssignmentTurnedInIcon />}  >
                  {saving ? 'Saving...' : 'Save'}
                </MyButton>
                <MyButton onClick={onClearClick} startIcon={<ClearIcon />}>
                  Clear
                </MyButton>
                <MyButton onClick={onCancelClick} startIcon={<CancelIcon />}>
                  Cancel
                </MyButton>
              </MyCardActions>
            </MyCardContent>
          </MyLocalizationProvider>
        </MyCard>
      )}
    </>
  );
};

export default memo(FeeCollectionEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
