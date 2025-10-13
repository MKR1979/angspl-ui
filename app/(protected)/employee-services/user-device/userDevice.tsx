'use client';
import useDeviceMappingEntry from './useUserDeviceEntry';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import UserDeviceDTO from '@/app/types/UserDeviceDTO';
import * as Constants from '../../constants/constants';
import { Typography, Card, Divider, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import MyButton from '@/app/custom-components/MyButton';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';

type UserDeviceEntryProps = {
  dtoUserDevice: UserDeviceDTO;
};

const UserDeviceEntry = (props: UserDeviceEntryProps) => {
  const { state, setOpen1, setClose1, onStatusBlur, onStatusChange, onCancelClick, onSaveClick, saving, onInputChange, onRemarksBlur } =
    useDeviceMappingEntry(props);

  return (
    <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color="black">
        User Devices
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <MyGrid container spacing={2}>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="User Id"
            name="user_id"
            value={state.dtoUserDevice.user_id}
            inputProps={{
              readOnly: true
            }}
          />
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Name"
            name="name"
            value={state.dtoUserDevice?.name}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />
          <MyTypography className="error"> {state.errorMessages.name}</MyTypography>
        </MyGrid>

        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Device Info"
            name="device_info"
            value={state.dtoUserDevice.device_info}
            inputProps={{
              readOnly: true // Only this is needed for a read-only field
            }}
          />
        </MyGrid>

        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyAutocomplete
            open={state.open1}
            onOpen={setOpen1}
            onClose={setClose1}
            value={{ text: state.dtoUserDevice.status }}
            getOptionLabel={(option: any) => option.text}
            firstitem={{ id: 0, text: '' }}
            options={state.arrDeviceMappingTypeLookup}
            onChange={onStatusChange}
            onBlur={onStatusBlur}
            filterOptions={(options, state) => {            // searchable lookup
              const searchTerm = state.inputValue.toLowerCase();
              return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
            }}
            renderInput={(params) => (
              <MyTextField
                {...params}
                label="Status"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!state.errorMessages.status ? true : false}
                placeholder="e.g. Select Active, In-active"
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
          <MyTypography className="error">{state.errorMessages.status}</MyTypography>
        </MyGrid>
        <MyGrid size={{ xs: 12, sm: 6 }}>
          <MyTextField
            label="Remarks"
            name="remarks"
            value={state.dtoUserDevice.remarks}
            onChange={onInputChange}
            inputProps={{
              maxLength: Constants.USER_DEVICE_REMARK_LENGTH,
              pattern: '^[A-Za-z]{1,2}$'
            }}
            onBlur={onRemarksBlur}
            error={state.errorMessages.remarks ? true : false}
          />
          <MyTypography className="error"> {state.errorMessages.remarks}</MyTypography>
        </MyGrid>
      </MyGrid>

      <MyDivider sx={{ my: 2 }} />

      <MyCardActions>
        <>
          <MyButton onClick={onSaveClick} startIcon={<AssignmentTurnedInIcon />} disabled={saving}>
            {saving ? 'Updating...' : 'Update'}
          </MyButton>
          <MyButton onClick={onCancelClick} startIcon={<CancelIcon />}>
            Close
          </MyButton>
        </>
      </MyCardActions>
    </Card>
  );
};

export default memo(UserDeviceEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
