import { Metadata } from 'next';
import ClientViewCase from './client-view-case';
import { GET_CASE } from '@/app/graphql/Case';
import { createServerApolloClient } from '@/app/common/utility';
import CaseDTO, { CASE } from '@/app/types/CaseDTO';
import { console } from 'inspector';

export const metadata: Metadata = {
  title: 'View Case'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewCasePage({ params }: Props) {
  const { id } = await params;
  let dtoCase: CaseDTO = CASE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_CASE,
      variables: {
        id: parseInt(id)
      }
    });

    const results = await Promise.all([result]);
    if (results[0]?.data?.getCase) {
      dtoCase = results[0].data.getCase;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewCase dtoCase={dtoCase}></ClientViewCase>;
}
