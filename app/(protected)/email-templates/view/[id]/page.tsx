import { Metadata } from 'next';
import ClientViewEmailTemplate from './client-view-email-template';
import { GET_EMAIL_TEMPLATE } from '@/app/graphql/EmailTemplate';
import { createServerApolloClient } from '@/app/common/utility';
import EmailTemplateDTO, { EMAIL_TEMPLATE } from '@/app/types/EmailTemplateDTO';

export const metadata: Metadata = {
  title: 'View Email Template'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewEmailTemplatePage({ params }: Props) {
  const { id } = await params;
  let dtoEmailTemplate: EmailTemplateDTO = EMAIL_TEMPLATE;
  try {
    const apolloClient = await createServerApolloClient();  
    const result = apolloClient.query({
      query: GET_EMAIL_TEMPLATE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getEmailTemplate) {
      dtoEmailTemplate = results[0].data.getEmailTemplate;
    }
  } catch {}
  return <ClientViewEmailTemplate dtoEmailTemplate={dtoEmailTemplate}></ClientViewEmailTemplate>;
}
