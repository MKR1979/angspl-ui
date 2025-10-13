import { Metadata } from 'next';
import ClientEditSiteConfig from './client-edit-site-config';
import { GET_SITE_CONFIG } from '@/app/graphql/SiteConfig';
import { createServerApolloClient } from '@/app/common/utility';
import SiteConfigDTO, { SITE_CONFIG } from '@/app/types/SiteConfigDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COMPANY_LOOKUP } from '@/app/graphql/Company';

export const metadata: Metadata = {
  title: 'Edit SiteConfig'
};

export const revalidate = 0;

 type Props = { params: Promise<{ id: string }>, searchParams: Promise<{company_id: string}> };

export default async function EditSiteConfigPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { company_id } = await searchParams;
  let dtoSiteConfig: SiteConfigDTO = SITE_CONFIG;
    let arrCompanyLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_SITE_CONFIG,
      variables: {
        id: parseInt(id),
        company_id: parseInt(company_id)
      }
    });
        const result1 = apolloClient.query({
      query: COMPANY_LOOKUP
    });
    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getSiteConfig) {
      dtoSiteConfig = results[0].data.getSiteConfig;
    }
        if (results[1]?.data?.getCompanyLookup) {
      arrCompanyLookup = results[1].data.getCompanyLookup;
    }
  } catch {}
  return <ClientEditSiteConfig dtoSiteConfig={dtoSiteConfig} arrCompanyLookup={arrCompanyLookup} />;
}
