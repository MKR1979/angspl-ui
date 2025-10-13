'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useUserEntry from './useUserEntry';
import MyTypography from '@/app/custom-components/MyTypography';
// import MyFormControl from '@/app/custom-components/MyFormControl';
// import MyInputLabel from '@/app/custom-components/MyInputLabel';
// import MySelect from '@/app/custom-components/MySelect';
// import { arrUserStatus } from '@/app/common/Configuration';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyDivider from '@/app/custom-components/MyDivider';
import MyGrid from '@/app/custom-components/MyGrid';
import MyCard from '@/app/custom-components/MyCard';
import UserDTO from '@/app/types/UserDTO';
import LookupDTO from '@/app/types/LookupDTO';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyBox from '@/app/custom-components/MyBox';
import MyImage from '@/app/custom-components/MyImage';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import * as gConstants from '../../constants/constants';
import * as Constants from '../constants/constants';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

type UserEntryProps = {
  dtoUser: UserDTO;
  arrRoleLookup: LookupDTO[];
  arrTypeLookup: LookupDTO[];
};

const UserEntry = (props: UserEntryProps) => {
  const {
    state, isEditMode,
    onInputChange,
    onStatusChange,
    onPlainInputChange,
    onMobileNoChange,
    onRoleNameChange,
    onTypeChange,
    onFirstNameBlur,
    onLastNameBlur,
    onEMailIdBlur,
    onMobileNoBlur,
    onUserNameBlur,
    onPasswordBlur,
    showPassword,
    setShowPassword,
    onStatusBlur,
    onRoleBlur,
    onTypeBlur,
    onSaveClick,
    onClearClick,
    onCancelClick,
    setOpen1,
    setClose1,
    setOpen2,
    setClose2,
    setOpen3,
    setClose3,
    onImageError,
    onImageClick,
    onNormalizedInputChange,
    UploadImage,
    saving,
  } = useUserEntry(props);

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 2 }}>
            <MyGrid size={{ xs: 12, sm: 12 }}>
              <MyBox sx={{ width: '175px' }}>
                <MyImage
                  src={
                    state.dtoUser.image_url?.trim() == ''
                      ? '/common/default-image.webp'
                      : process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + state.dtoUser.image_url
                  }
                  width={800}
                  height={800}
                  alt="profile picture"
                  onClick={onImageClick}
                  style={{ cursor: 'pointer', width: 'auto', height: 'auto' }}
                  layout="intrinsic"
                  onError={onImageError}
                />
              </MyBox>
              <input
                type="file"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*, .mp4"
                multiple
                id="user_image"
                name="file"
                onChange={UploadImage}
                style={{ display: 'none' }}
              />
            </MyGrid>
          </MyGrid>
          <MyGrid size={{ xs: 12, sm: 10 }}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="First Name"
                  name="first_name"
                  value={state.dtoUser.first_name}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: gConstants.FIRST_NAME_LENGTH, // Restricts input to two characters
                    pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                  }}
                  onBlur={onFirstNameBlur}
                  error={state.errorMessages.first_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.first_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="Last Name"
                  name="last_name"
                  value={state.dtoUser.last_name}
                  onChange={onInputChange}
                  inputProps={{
                    maxLength: gConstants.LAST_NAME_LENGTH, // Restricts input to two characters
                    pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                  }}
                  onBlur={onLastNameBlur}
                  error={state.errorMessages.last_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.last_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  label="E-Mail"
                  name="email"
                  value={state.dtoUser.email}
                  onChange={onNormalizedInputChange}
                  inputProps={{
                    maxLength: gConstants.EMAIL_LENGTH, // Restricts input to two characters
                    pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                  }}
                  onBlur={onEMailIdBlur}
                  error={state.errorMessages.email ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyPhoneNumber
                  label="Mobile #"
                  onChange={onMobileNoChange}
                  value={state.dtoUser.mobile_no}
                  onBlur={onMobileNoBlur}
                  error={state.errorMessages.mobile_no ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.mobile_no}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  autoComplete="new-password"
                  label="Username"
                  name="user_name"
                  value={state.dtoUser.user_name}
                  onChange={onNormalizedInputChange}
                  inputProps={{
                    maxLength: gConstants.USER_NAME_LENGTH, // Restricts input to two characters
                    pattern: '^[A-Za-z]{1,2}$' // Allows only up to two letters (A-Z, a-z)
                  }}
                  onBlur={onUserNameBlur}
                  error={state.errorMessages.user_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.user_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  autoComplete="new-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  value={state.dtoUser.password}
                  onChange={onPlainInputChange}
                  onBlur={onPasswordBlur}
                  error={state.errorMessages.password ? true : false}
                  inputProps={{
                    ...(isEditMode
                      ? { maxLength: gConstants.PASSWORD_MAX_LENGTH }
                      : { minLength: gConstants.PASSWORD_MIN_LENGTH, maxLength: gConstants.PASSWORD_LENGTH })
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                          {/* sx={{ fontSize: 18 }} */}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  required
                />
                <MyTypography className="error"> {state.errorMessages.password}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open1}
                  onOpen={setOpen1}
                  onClose={setClose1}
                  value={{
                    id: state.dtoUser.role_id,
                    text: state.dtoUser.role_name
                  }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrRoleLookup}
                  onChange={onRoleNameChange}
                  filterOptions={(options, state) => {
                    // searchable Lookup
                    const searchTerm = state.inputValue.toLowerCase();
                    return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                  }}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Role"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onRoleBlur}
                      error={state.errorMessages.role_name ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.role_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open2}
                  onOpen={setOpen2}
                  onClose={setClose2}
                  value={{
                    id: state.dtoUser.type_id,
                    text: state.dtoUser.type_name
                  }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrTypeLookup}
                  onChange={onTypeChange}
                  filterOptions={(options, state) => {
                    // searchable Lookup
                    const searchTerm = state.inputValue.toLowerCase();
                    return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
                  }}
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Type"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      onBlur={onTypeBlur}
                      error={state.errorMessages.type_name ? true : false}
                    />
                  )}
                />
                <MyTypography className="error"> {state.errorMessages.type_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyAutocomplete
                  open={state.open3}
                  onOpen={setOpen3}
                  onClose={setClose3}
                  value={{ text: state.dtoUser.status }}
                  getOptionLabel={(option: any) => option.text}
                  firstitem={{ id: 0, text: '' }}
                  options={state.arrUserStatusLookup}
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
                      error={state.errorMessages.status ? true : false}
                    />
                  )}
                />
                <MyTypography className="error">{state.errorMessages.status}</MyTypography>
              </MyGrid>

              {state.dtoUser?.role_name && state.dtoUser.role_name !== Constants.ROLE_NAME_ADMIN && (
                <MyGrid size={{ xs: 12, sm: 6 }}>
                  <MyTextField
                    label="Code"
                    name="code"
                    value={state.dtoUser.code}
                    onChange={onPlainInputChange}
                    error={state.errorMessages.code ? true : false}
                  />
                  <MyTypography className="error"> {state.errorMessages.code}</MyTypography>
                </MyGrid>
              )}
            </MyGrid>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton onClick={onSaveClick} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </MyButton>
        <MyButton onClick={onClearClick}>Clear</MyButton>
        <MyButton onClick={onCancelClick}>Cancel</MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(UserEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
