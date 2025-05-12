import { Metadata } from 'next';
import ClientSiteConfigList from './client-site-config-list';
import { SITE_CONFIG_LIST } from '@/app/graphql/SiteConfig';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import SiteConfigDTO from '@/app/types/SiteConfigDTO';
export const metadata: Metadata = {
  title: 'SiteConfig'
};

export const revalidate = 0;

export default async function SiteConfigListPage() {
  let arrSiteConfigDTO: SiteConfigDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: SITE_CONFIG_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getSiteConfigList?.siteConfigs) {
      arrSiteConfigDTO = results[0].data.getSiteConfigList.siteConfigs;
    }
    if (results[0]?.data?.getSiteConfigList?.total_records) {
      total_records = results[0].data.getSiteConfigList.total_records;
    }
  } catch {}
  return <ClientSiteConfigList arrSiteConfigDTO={arrSiteConfigDTO} total_records={total_records}></ClientSiteConfigList>;
}
