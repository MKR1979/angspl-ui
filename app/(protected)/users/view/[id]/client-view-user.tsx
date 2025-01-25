'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewUser from './useViewUser';
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
  const { state, onEditClick, onCancelClick, onImageError } = useViewUser({ dtoUser });

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
                        ? '/default-image.avif'
                        : process.env.NEXT_PUBLIC_API_ROOT_URL + '/uploads/' + state.dtoUser.image_url
                    }
                    width={800}
                    height={800}
                    alt="profile picture"
                    style={{ width: 'auto', height: 'auto' }}
                    layout="intrinsic"
                    onError={onImageError}
                  />
                </MyBox>
              </MyGrid>
            </MyGrid>
            <MyGrid size={{ xs: 12, sm: 10 }}>
              <MyGrid container spacing={2}>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">First Name:</MyTypography>
                  <MyTypography>{state.dtoUser.first_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Last Name:</MyTypography>
                  <MyTypography>{state.dtoUser.last_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">E-Mail:</MyTypography>
                  <MyTypography>{state.dtoUser.email}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Mobile #:</MyTypography>
                  <MyTypography>{state.dtoUser.mobile_no}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Role:</MyTypography>
                  <MyTypography>{state.dtoUser.role_name}</MyTypography>
                </MyGrid>
                <MyGrid size={{ xs: 12, md: 6 }}>
                  <MyTypography variant="subtitle2">Status:</MyTypography>
                  <MyTypography>{state.dtoUser.status}</MyTypography>
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
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewUser, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
