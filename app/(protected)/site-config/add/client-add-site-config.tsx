'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import SiteConfigEntry from '../site-config-entry';
import useAddSiteConfig from './useAddSiteConfig';
import { SITE_CONFIG } from '@/app/types/SiteConfigDTO';

const ClientAddSiteConfig = () => {
  const { state } = useAddSiteConfig();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <SiteConfigEntry dtoSiteConfig={SITE_CONFIG} />
    </>
  );
};

export default memo(ClientAddSiteConfig, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
