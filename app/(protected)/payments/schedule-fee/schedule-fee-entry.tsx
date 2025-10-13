'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import usePaymentEntry from './useScheduleFeeEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import ScheduleFeeDTO from '@/app/types/ScheduleFeeDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import * as gConstants from '../../../constants/constants';
import { Typography, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonIcon from '@mui/icons-material/Person';
import MyNumericFormat from '@/app/custom-components/MyNumericFormat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

type FeePaymentEntryProps = {
  dtoScheduleFee: ScheduleFeeDTO;
};

const ScheduleFeeEntry = (props: FeePaymentEntryProps) => {
  const {
    state,
    saving,
    onSaveClick,
    onClearClick,
    onCancelClick,
    onStartDateBlur,
    onPaymentTypeBlur,
    onStartDateChange,
    onPaymentTypeChange,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    setOpen4,
    setClose4,
    setOpen6,
    setClose6,
    onCourseBlur,
    onStudentBlur,
    onCourseChange,
    onStudentNameChange,
    arrFeePaymentFrequencyMonthly,
    arrFeePaymentFrequencyQuarterly,
    arrFeePaymentType,
    arrFeePaymentFrequencyHalfYearly,
    onStatusChange,
    onStatusBlur,
    onAmountChange,
    onAmountBlur,
    // onFineAmountChange,
    // onDiscountAmountChange,
    onInputChange
  } = usePaymentEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <Typography variant="h6" gutterBottom color="black">
          Payment Information
        </Typography>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open2}
              onOpen={setOpen2}
              onClose={setClose2}
              value={{
                id: state.dtoScheduleFee.learner_id,
                text: state.dtoScheduleFee.student_name
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
            <MyAutocomplete
              open={state.open1}
              onOpen={setOpen1}
              onClose={setClose1}
              value={{
                id: state.dtoScheduleFee.course_id,
                text: state.dtoScheduleFee.course_name
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
                  error={state.errorMessages.course_name ? true : false}
                  placeholder="Select Course..."
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
              open={state.open3}
              onOpen={setOpen3}
              onClose={setClose3}
              value={{ text: state.dtoScheduleFee.payment_frequency }}
              // getOptionLabel={(option: any) => option.text}
              getOptionLabel={(option: any) => option?.text ?? ''}
              firstitem={{ id: 0, text: '' }}
              options={arrFeePaymentType}
              onChange={onPaymentTypeChange}
              onBlur={onPaymentTypeBlur}
              filterOptions={(options, state) => {
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Payment Frequency"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  error={state.errorMessages.payment_frequency ? true : false}
                  placeholder="e.g. Monthly,Quarterly, Yearly"
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
            <MyTypography className="error">{state.errorMessages.payment_frequency}</MyTypography>
          </MyGrid>
          {['monthly', 'quarterly', 'half-yearly'].includes(state.dtoScheduleFee.payment_frequency?.toLowerCase()) && (
            <MyGrid size={{ xs: 12, sm: 6 }}>
              <MyAutocomplete
                open={state.open4}
                onOpen={setOpen4}
                onClose={setClose4}
                value={{ text: state.dtoScheduleFee.start_date }}
                getOptionLabel={(option: any) => option?.text ?? ''}
                firstitem={{ text: '' }}
                options={
                  state.dtoScheduleFee.payment_frequency?.toLowerCase() === 'monthly'
                    ? arrFeePaymentFrequencyMonthly
                    : state.dtoScheduleFee.payment_frequency?.toLowerCase() === 'quarterly'
                      ? arrFeePaymentFrequencyQuarterly
                      : state.dtoScheduleFee.payment_frequency?.toLowerCase() === 'half-yearly'
                        ? arrFeePaymentFrequencyHalfYearly
                        : []
                }
                onChange={onStartDateChange}
                onBlur={onStartDateBlur}
                filterOptions={(options, state) => {
                  const searchTerm = state.inputValue.toLowerCase();
                  return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                }}
                renderInput={(params) => (
                  <MyTextField
                    {...params}
                    label="Start From"
                    slotProps={{ inputLabel: { shrink: true } }}
                    error={!!state.errorMessages.start_date}
                    placeholder={
                      state.dtoScheduleFee.payment_frequency?.toLowerCase() === 'monthly'
                        ? 'e.g. Monthly'
                        : state.dtoScheduleFee.payment_frequency?.toLowerCase() === 'quarterly'
                          ? 'e.g. April - June'
                          : state.dtoScheduleFee.payment_frequency?.toLowerCase() === 'half-yearly'
                            ? 'e.g. April - September'
                            : state.dtoScheduleFee.payment_frequency?.toLowerCase() === 'annual'
                              ? 'e.g. Annual'
                              : 'Select start date'
                    }
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
              <MyTypography className="error">{state.errorMessages.start_date}</MyTypography>
            </MyGrid>
          )}
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Discount"
              name="discount"
              value={state.dtoScheduleFee.discount || ''}
              onChange={onAmountChange}
              placeholder="Enter discount amount"
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
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Fine Amount"
              name="fine_amount"
              value={state.dtoScheduleFee.fine_amount || ''}
              onChange={onAmountChange}
              placeholder="Enter fine amount"
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
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Total Amount"
              name="total_amount"
              placeholder="Enter amount"
              error={state.errorMessages.total_amount ? true : false}
              value={state.dtoScheduleFee.total_amount || ''}
              onChange={onAmountChange}
              onBlur={onAmountBlur}
              // error={!!state.errorMessages.total_amount}
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
            <MyTypography className="error"> {state.errorMessages.total_amount}</MyTypography>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyTextField
              label="Net Amount"
              name="net_amount"
              placeholder="Payable amount..."
              value={state.dtoScheduleFee.net_amount || ''}
              onChange={onInputChange}
              InputProps={{ readOnly: true }}
            />
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 6 }}>
            <MyAutocomplete
              open={state.open6}
              onOpen={setOpen6}
              onClose={setClose6}
              value={{ text: state.dtoScheduleFee.status }}
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
          <MyButton onClick={onSaveClick} disabled={saving}  startIcon={<AssignmentTurnedInIcon/>} >
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
    </MyCard>
  );
};

export default memo(ScheduleFeeEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
