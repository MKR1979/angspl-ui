import { Metadata } from 'next';
import ClientContactList from './client-contact-list';
import { CONTACT_LIST } from '@/app/graphql/Contact';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import ContactDTO from '@/app/types/ContactDTO';
export const metadata: Metadata = {
  title: 'Contacts'
};

export const revalidate = 0;

export default async function ContactListPage() {
  let arrContactDTO: ContactDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: CONTACT_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getContactList?.contacts) {
      arrContactDTO = results[0].data.getContactList.contacts;
    }
    if (results[0]?.data?.getContactList?.total_records) {
      total_records = results[0].data.getContactList.total_records;
    }
  } catch {}
  return <ClientContactList arrContactDTO={arrContactDTO} total_records={total_records}></ClientContactList>;
}
