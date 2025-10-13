'use client';
import useAttendanceEntry from './useReferralEntry';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import ReferralDTO from '@/app/types/ReferralDTO';
import * as gConstants from '../../constants/constants';
import { Typography, Card, Divider, InputAdornment } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import MyButton from '@/app/custom-components/MyButton';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import dayjs from 'dayjs';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import { ClearIcon } from '@mui/x-date-pickers';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import PersonIcon from '@mui/icons-material/Person';

type AttendanceEntryProps = {
  dtoReferral: ReferralDTO;
};

const ReferralEntry = (props: AttendanceEntryProps) => {
  const {
    state,
    onCancelClick,
    saving,
    onReferralCompanyNameBlur,
    onInputChange,
    onPhoneNoBlur,
    onEMailIdBlur,
    onPhoneNoChange,
    onKeyRequirementsBlur,
    onClearClick,
    onAddressBlur,
    onSaveClick,
    onContactPersonBlur,
    setOpen1,
    setClose1,
    onProductInterestChange,
    onProductInterestBlur,onNormalizedInputChange,
  } = useAttendanceEntry(props);

  return (
    <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color="black">
        Add Your Referral
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <MyGrid container spacing={2}>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Referral Date"
            name="referral_date"
            type="datetime-local"
            value={dayjs().format('YYYY-MM-DDTHH:mm')}
            fullWidth
            required
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Referral Company Name"
            name="referral_company_name"
            value={state.dtoReferral.referral_company_name}
            onChange={onInputChange}
            inputProps={{
              maxLength: gConstants.REFERRAL_COMPANY_NAME,
              pattern: '^[A-Za-z]{1,2}$'
            }}
            onBlur={onReferralCompanyNameBlur}
            error={state.errorMessages.referral_company_name ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.referral_company_name}</MyTypography>
        </MyGrid>

        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Contact Person"
            name="contact_person"
            value={state.dtoReferral.contact_person}
            onBlur={onContactPersonBlur}
            onChange={onInputChange}
            InputProps={{
              inputProps: { maxLength: gConstants.FULL_NAME_LENGTH, pattern: '^[A-Za-z]{1,2}$' },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              )
            }}
            error={state.errorMessages.contact_person ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.contact_person}</MyTypography>
        </MyGrid>

        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="E-Mail"
            name="email"
            value={state.dtoReferral.email}
            onChange={onNormalizedInputChange}
            inputProps={{
              maxLength: gConstants.EMAIL_LENGTH, // Restricts input to two characters
              pattern: '^[a-zA-Z0-9]{1,2}$' // Allows only letters (a-z, A-Z) and numbers (0-9), up to two characters
            }}
            onBlur={onEMailIdBlur}
            error={state.errorMessages.email ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyPhoneNumber
            label="Mobile No"
            onChange={onPhoneNoChange}
            value={state.dtoReferral.mobile_no}
            onBlur={onPhoneNoBlur}
            error={state.errorMessages.mobile_no ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.mobile_no}</MyTypography>
        </MyGrid>

        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Address"
            name="address"
            value={state.dtoReferral.address}
            onChange={onInputChange}
            onBlur={onAddressBlur}
            inputProps={{
              maxLength: gConstants.ADDRESS_LENGTH, // Restricts input to two characters
              pattern: '^[a-zA-Z0-9]{1,2}$' // Allows only letters (a-z, A-Z) and numbers (0-9), up to two characters
            }}
            error={state.errorMessages.address ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.address}</MyTypography>
        </MyGrid>

        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyAutocomplete
            open={state.open1}
            onOpen={setOpen1}
            onClose={setClose1}
            value={{ text: state.dtoReferral?.product_interest }}
            getOptionLabel={(option: any) => option.text}
            firstitem={{ id: 0, text: '' }}
            options={state.arrProductInterestLookup}
            onChange={onProductInterestChange}
            onBlur={onProductInterestBlur}
            filterOptions={(options, state) => {            // searchable lookup
              const searchTerm = state.inputValue.toLowerCase();
              return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
            }}
            renderInput={(params) => (
              <MyTextField
                {...params}
                label="Product Interest"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!state.errorMessages.product_interest ? true : false}
                placeholder="e.g. Select School, College"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentTurnedInIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          <MyTypography className="error">{state.errorMessages.product_interest}</MyTypography>
        </MyGrid>

        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Requirement"
            name="requirement"
            value={state.dtoReferral.requirement}
            onChange={onInputChange}
            onBlur={onKeyRequirementsBlur}
            error={state.errorMessages.requirement ? true : false}
            multiline
            minRows={1} // Minimum height
            maxRows={4} // Optional: limit max expansion
            fullWidth
          />
          <MyTypography className="error">{state.errorMessages.requirement}</MyTypography>
        </MyGrid>
      </MyGrid>

      <MyDivider sx={{ my: 2 }} />

      <MyCardActions>
        <>
          <MyButton onClick={onSaveClick} startIcon={<AssignmentTurnedInIcon />} disabled={saving}>
            {saving ? 'Submitting...' : 'Submit'}
          </MyButton>
          <MyButton onClick={onClearClick} startIcon={<ClearIcon />}>
            Clear
          </MyButton>
          <MyButton onClick={onCancelClick} startIcon={<CancelIcon />}>
            Close
          </MyButton>
        </>
      </MyCardActions>
    </Card>
  );
};

export default memo(ReferralEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
