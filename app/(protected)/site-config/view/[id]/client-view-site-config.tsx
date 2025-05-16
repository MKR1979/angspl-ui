'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewSiteConfig from './useViewSiteConfig';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import SiteConfigDTO from '@/app/types/SiteConfigDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoSiteConfig: SiteConfigDTO;
};

const ClientViewSiteConfig = ({ dtoSiteConfig }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewSiteConfig({ dtoSiteConfig });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Key:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoSiteConfig.key}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Value:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoSiteConfig.value}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Type:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoSiteConfig.type}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Description:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoSiteConfig.description}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography>Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoSiteConfig.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoSiteConfig.created_by_user_name}
          createdAt={state.dtoSiteConfig.created_at}
          modifiedBy={state.dtoSiteConfig.modified_by_user_name}
          modifiedAt={state.dtoSiteConfig.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewSiteConfig, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
