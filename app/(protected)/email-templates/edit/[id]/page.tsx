import { Metadata } from 'next';
import ClientEditEmailTemplate from './client-edit-email-template ';
import { GET_EMAIL_TEMPLATE } from '@/app/graphql/EmailTemplate';
import { createServerApolloClient } from '@/app/common/utility';
import EmailTemplateDTO, { EMAIL_TEMPLATE } from '@/app/types/EmailTemplateDTO';

export const metadata: Metadata = {
  title: 'Edit Email Templates '
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditEmailTemplatePage({ params }: Props) {
  const { id } = await params;

  let dtoEmailTemplate: EmailTemplateDTO = EMAIL_TEMPLATE;

  try {
    const apolloClient = await createServerApolloClient();
    const result = await apolloClient.query({
      query: GET_EMAIL_TEMPLATE,
      variables: {
        id: parseInt(id)
      }
    });

    if (result?.data?.getEmailTemplate) {
      dtoEmailTemplate = result.data.getEmailTemplate;
    }
  } catch (error) {
    console.error('Error fetching Email Template  data:', error);
  }

  return <ClientEditEmailTemplate dtoEmailTemplate={dtoEmailTemplate} />;
}
