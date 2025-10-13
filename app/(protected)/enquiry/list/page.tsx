import { Metadata } from 'next';
import ClientEnquiryList from './client-enquiry-list';
import { ENQUIRY_LIST } from '@/app/graphql/ContactUs';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import ContactPointDTO from '@/app/types/ContactUsDTO';
export const metadata: Metadata = {
  title: 'Review Enquiry'
};

export const revalidate = 0;

export default async function EnquiryListPage() {
  let arrContactPointDTO: ContactPointDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: ENQUIRY_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getEnquiryList?.enquiries) {
      arrContactPointDTO = results[0].data.getEnquiryList.enquiries;
    }
    if (results[0]?.data?.getEnquiryList?.total_records) {
      total_records = results[0].data.getEnquiryList.total_records;
    }
  } catch {}
  return <ClientEnquiryList arrContactPointDTO={arrContactPointDTO} total_records={total_records}></ClientEnquiryList>;
}
