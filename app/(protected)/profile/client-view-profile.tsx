'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewUser from './useViewProfile';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import UserDTO from '@/app/types/UserDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import MyImage from '@/app/custom-components/MyImage';

type Props = {
  dtoUser: UserDTO;
};

const ClientViewUser = ({ dtoUser }: Props) => {
  const { state, onEditClick, onImageError,onCancelClick } = useViewUser({ dtoUser });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
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
                    style={{ cursor: 'pointer', width: 'auto', height: 'auto' }}
                    layout="intrinsic"
                    onError={onImageError}
                  />
                </MyBox>
              </MyGrid>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 10 }}>
              <MyGrid container spacing={2}>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle1">First Name:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoUser.first_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle1">Last Name:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoUser.last_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle1">E-Mail:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoUser.email}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle1">Mobile #:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoUser.mobile_no}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle1">Role:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoUser.role_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle1">Status:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoUser.status}</MyTypography>
                </MyGrid>
              </MyGrid>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoUser.created_by_user_name}
          createdAt={state.dtoUser.created_at}
          modifiedBy={state.dtoUser.modified_by_user_name}
          modifiedAt={state.dtoUser.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Close</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewUser, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
