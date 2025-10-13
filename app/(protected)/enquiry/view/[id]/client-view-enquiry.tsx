'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewEnquiry from './useViewEnquiry';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import ContactPointDTO from '@/app/types/ContactUsDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoContactPoint: ContactPointDTO;
};

const ClientViewEnquiry = ({ dtoContactPoint }: Props) => {
  const { state, onCancelClick } = useViewEnquiry({ dtoContactPoint });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Contact Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoContactPoint.contact_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoContactPoint.email}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Phone No:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoContactPoint.phone_no}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Category:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoContactPoint.category_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Can Contacted over phone:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoContactPoint.can_contacted ? 'Yes' : 'No'}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Subject:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoContactPoint.subject}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Message:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoContactPoint.message}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoContactPoint.created_by_user_name}
          createdAt={state.dtoContactPoint.created_at}
          modifiedBy={state.dtoContactPoint.modified_by_user_name}
          modifiedAt={state.dtoContactPoint.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onCancelClick}>Close</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewEnquiry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
