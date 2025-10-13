'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewEmailTemplate from './useViewEmailTemplate';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import EmailTemplateDTO from '@/app/types/EmailTemplateDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../store';
import { findPermission } from '../../../../common/utility-permission';

type Props = {
  dtoEmailTemplate: EmailTemplateDTO;
};

const ClientViewEmailTemplate = ({ dtoEmailTemplate }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewEmailTemplate({ dtoEmailTemplate });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Template Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmailTemplate.email_template_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Template Body:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmailTemplate.email_template_body}</MyTypography>
              </MyBox>
            </MyGrid>
              <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Template Subject:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmailTemplate.email_template_sub}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoEmailTemplate.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoEmailTemplate.created_by_user_name}
          createdAt={state.dtoEmailTemplate.created_at}
          modifiedBy={state.dtoEmailTemplate.modified_by_user_name}
          modifiedAt={state.dtoEmailTemplate.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 173) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewEmailTemplate, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
