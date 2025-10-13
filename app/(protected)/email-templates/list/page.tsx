import { Metadata } from 'next';
import ClientEmailTemplateList from './client-email_template-list';
import { EMAIL_TEMPLATE_LIST } from '@/app/graphql/EmailTemplate';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import EmailTemplateDTO from '@/app/types/EmailTemplateDTO';
export const metadata: Metadata = {
  title: 'Email Template'
};

export const revalidate = 0;

export default async function EmailTemplateListPage() {
  let arrEmailTemplateDTO: EmailTemplateDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: EMAIL_TEMPLATE_LIST,
      variables: {       
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getEmailTemplateList?.email_template) {
      arrEmailTemplateDTO = results[0].data.getEmailTemplateList.email_template;
    }
    if (results[0]?.data?.getEmailTemplateList?.total_records) {
      total_records = results[0].data.getEmailTemplateList.total_records;
    }
  } catch {}
  return <ClientEmailTemplateList arrEmailTemplateDTO={arrEmailTemplateDTO} total_records={total_records}></ClientEmailTemplateList>;
}
