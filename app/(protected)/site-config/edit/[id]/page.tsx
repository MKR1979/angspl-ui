import { Metadata } from 'next';
import ClientEditSiteConfig from './client-edit-site-config';
import { GET_SITE_CONFIG } from '@/app/graphql/SiteConfig';
import { createServerApolloClient } from '@/app/common/utility';
import SiteConfigDTO, { SITE_CONFIG } from '@/app/types/SiteConfigDTO';

export const metadata: Metadata = {
  title: 'Edit SiteConfig'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditSiteConfigPage({ params }: Props) {
  const { id } = await params;
  let dtoSiteConfig: SiteConfigDTO = SITE_CONFIG;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_SITE_CONFIG,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getSiteConfig) {
      dtoSiteConfig = results[0].data.getSiteConfig;
    }
  } catch {}
  return <ClientEditSiteConfig dtoSiteConfig={dtoSiteConfig} />;
}
