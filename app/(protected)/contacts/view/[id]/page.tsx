import { Metadata } from 'next';
import ClientViewContact from './client-view-contact';
import { GET_CONTACT } from '@/app/graphql/Contact';
import { createServerApolloClient } from '@/app/common/utility';
import ContactDTO, { CONTACT } from '@/app/types/ContactDTO';

export const metadata: Metadata = {
  title: 'View Contact'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewContactPage({ params }: Props) {
  const { id } = await params;
  let dtoContact: ContactDTO = CONTACT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_CONTACT,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getContact) {
      dtoContact = results[0].data.getContact;
    }
  } catch {}
  return <ClientViewContact dtoContact={dtoContact}></ClientViewContact>;
}
