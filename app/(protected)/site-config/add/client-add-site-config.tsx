'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import SiteConfigEntry from '../site-config-entry';
import useAddSiteConfig from './useAddSiteConfig';
import { SITE_CONFIG } from '@/app/types/SiteConfigDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { arrCompanyLookup: LookupDTO[] };

const ClientAddSiteConfig = ({ arrCompanyLookup }: Props) => {
  const { state } = useAddSiteConfig();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <SiteConfigEntry dtoSiteConfig={SITE_CONFIG} arrCompanyLookup={arrCompanyLookup} />
    </>
  );
};

export default memo(ClientAddSiteConfig, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
