'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import MyTextField from '@/app/custom-components/MyTextField';
import useUserEntry from './useUserEntry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyFormControl from '@/app/custom-components/MyFormControl';
import MyInputLabel from '@/app/custom-components/MyInputLabel';
import MySelect from '@/app/custom-components/MySelect';
import { arrUserStatus } from '@/app/common/Configuration';
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

type UserEntryProps = {
  dtoUser: UserDTO;
  arrRoleLookup: LookupDTO[];
};

const UserEntry = (props: UserEntryProps) => {
  const {
    state,
    onInputChange,
    onMobileNoChange,
    onRoleNameChange,
    onSelectChange,
    onFirstNameBlur,
    onLastNameBlur,
    onEMailIdBlur,
    onMobileNoBlur,
    onUserNameBlur,
    onPasswordBlur,
    onStatusBlur,
    onSaveClick,
    onCancelClick,
    setOpen1,
    setClose1,
    onImageError,
    onImageClick,
    UploadImage
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
                      ? '/default-image.avif'
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
                  onChange={onInputChange}
                  onBlur={onEMailIdBlur}
                  error={state.errorMessages.email ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.email}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                {/* <MyTextField
                  autoComplete="new-mobile"
                  label="Mobile #"
                  name="mobile_no"
                  value={state.dtoUser.mobile_no}
                  onChange={onInputChange}
                  onBlur={onMobileNoBlur}
                  error={state.errorMessages.mobile_no ? true : false}
                /> */}
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
                  onChange={onInputChange}
                  onBlur={onUserNameBlur}
                  error={state.errorMessages.user_name ? true : false}
                />
                <MyTypography className="error"> {state.errorMessages.user_name}</MyTypography>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  autoComplete="new-password"
                  type="password"
                  label="Password"
                  name="password"
                  value={state.dtoUser.password}
                  onChange={onInputChange}
                  onBlur={onPasswordBlur}
                  error={state.errorMessages.password ? true : false}
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
                  renderInput={(params) => (
                    <MyTextField
                      {...params}
                      label="Role"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                    />
                  )}
                />
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyFormControl error={state.errorMessages.status ? true : false} fullWidth>
                  <MyInputLabel>Status</MyInputLabel>
                  <MySelect
                    label="Status"
                    name="status"
                    value={state.dtoUser.status.trim() === '' ? ' ' : state.dtoUser.status.trim()}
                    dataSource={arrUserStatus}
                    onChange={onSelectChange}
                    onBlur={onStatusBlur}
                  />
                </MyFormControl>
                <MyTypography className="error"> {state.errorMessages.status}</MyTypography>
              </MyGrid>
            </MyGrid>
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
  );
};

export default memo(UserEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
