'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import SiteConfigEntry from '../../site-config-entry';
import useEditSiteConfig from './useEditSiteConfig';
import SiteConfigDTO from '@/app/types/SiteConfigDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoSiteConfig: SiteConfigDTO, arrCompanyLookup: LookupDTO[] };

const ClientEditSiteConfig = ({ dtoSiteConfig, arrCompanyLookup }: Props) => {
  const { state } = useEditSiteConfig();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <SiteConfigEntry dtoSiteConfig={dtoSiteConfig} arrCompanyLookup={arrCompanyLookup} />
    </>
  );
};

export default memo(ClientEditSiteConfig, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
