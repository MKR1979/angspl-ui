'use client';
import React, { memo } from 'react';
import eq from 'lodash/eq';
import MyTypography from '@/app/custom-components/MyTypography';
import MyGrid from '@/app/custom-components/MyGrid';
import MyButton from '@/app/custom-components/MyButton';
import MyBox from '@/app/custom-components/MyBox';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyTextField from '@/app/custom-components/MyTextField';
import MyPhoneNumber from '@/app/custom-components/MyPhoneNumber';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyFormControl from '@/app/custom-components/MyFormControl';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';

import useAffiliate from './useAffiliate';
import MyInputLabel from '@/app/custom-components/MyInputLabel';
import MySelect from '@/app/custom-components/MySelect';
import { arrUserStatus } from '@/app/common/Configuration';

const ClientAffiliate = () => {
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
    setOpen1,
    setClose1
  } = useAffiliate();

  return (
    <div style={{ width: '100%', paddingTop: '0px' }}>
      <MyBox>
        <MyCard>
          <MyCardContent>
            <MyTypography sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} component="h1" variant="h4" gutterBottom>
              AFFILIATE PROGRAM
            </MyTypography>
            <MyBox sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 3 }}>
              Affiliate with BizComrade and earn a huge recurring commission.
            </MyBox>
            Who can join the BizComrade Affiliate Program?
            <MyGrid container spacing={2} alignItems="stretch">
              <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <MyCardContent
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    Digital marketing agencies
                  </MyCardContent>
                </MyCard>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <MyCardContent
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    Influencers
                  </MyCardContent>
                </MyCard>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <MyCardContent
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    Tech consultants
                  </MyCardContent>
                </MyCard>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <MyCardContent
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    Business coaches
                  </MyCardContent>
                </MyCard>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <MyCardContent
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    E-commerce web developers
                  </MyCardContent>
                </MyCard>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 12, md: 3 }} style={{ display: 'flex' }}>
                <MyCard elevation={0} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <MyCardContent
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px solid rgb(238, 242, 246)' }}
                  >
                    Content creators
                  </MyCardContent>
                </MyCard>
              </MyGrid>
            </MyGrid>
          </MyCardContent>
        </MyCard>
      </MyBox>
      <MyCard>
        <MyCardContent>
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
        </MyCardContent>
        <MyDivider></MyDivider>
        <MyCardActions>
          <MyButton onClick={onSaveClick}>Submit</MyButton>
        </MyCardActions>
      </MyCard>
    </div>
  );
};

export default memo(ClientAffiliate, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
