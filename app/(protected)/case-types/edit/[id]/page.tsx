import { Metadata } from 'next';
import ClientEditCaseType from './client-edit-case-type';
import { GET_CASE_TYPE } from '@/app/graphql/CaseType';
import { createServerApolloClient } from '@/app/common/utility';
import CaseTypeDTO, { CASE_TYPE } from '@/app/types/CaseTypeDTO';

export const metadata: Metadata = {
  title: 'Edit Case Type'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditCaseTypePage({ params }: Props) {
  const { id } = await params;
  let dtoCaseType: CaseTypeDTO = CASE_TYPE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_CASE_TYPE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCaseType) {
      dtoCaseType = results[0].data.getCaseType;
    }
  } catch {}
  return <ClientEditCaseType dtoCaseType={dtoCaseType} />;
}
