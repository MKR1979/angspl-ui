import { Metadata } from 'next';
import ClientViewType from './client-view-type';
import { GET_TYPE } from '@/app/graphql/Type';
import { createServerApolloClient } from '@/app/common/utility';
import TypeDTO, { TYPE } from '@/app/types/TypeDTO';

export const metadata: Metadata = {
  title: 'View Type'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewTypePage({ params }: Props) {
  const { id } = await params;
  let dtoType: TypeDTO = TYPE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_TYPE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getType) {
      dtoType = results[0].data.getType;
    }
  } catch {}
  return <ClientViewType dtoType={dtoType}></ClientViewType>;
}
