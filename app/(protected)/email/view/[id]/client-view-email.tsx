'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewEmail from './useViewEmail';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import EmailDTO from '@/app/types/EmailDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoEmail: EmailDTO;
};

const ClientViewEmail = ({ dtoEmail }: Props) => {
  const { state, onCancelClick } = useViewEmail({ dtoEmail });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
                        <MyGrid size={{ xs: 12, md: 12 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Template Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmail.template_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Recipient Email:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmail.to_address}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Email Subject:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmail.subject}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 12 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Template Body:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmail.body}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Sent On:</MyTypography>
                {/* {state.dtoEmail.sent_at ? new Date(state.dtoEmail.sent_at).toLocaleDateString() : 'N/A'} */}
                {state.dtoEmail.sent_at ? new Date(state.dtoEmail.sent_at).toLocaleDateString() : 'N/A'}
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoEmail.created_by_user_name}
          createdAt={state.dtoEmail.created_at}
          modifiedBy={state.dtoEmail.modified_by_user_name}
          modifiedAt={state.dtoEmail.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onCancelClick}>Close</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewEmail, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
