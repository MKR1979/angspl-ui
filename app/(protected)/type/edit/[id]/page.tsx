import { Metadata } from 'next';
import ClientEditType from './client-edit-type';
import { GET_TYPE } from '@/app/graphql/Type';
import { createServerApolloClient } from '@/app/common/utility';
import TypeDTO, { TYPE } from '@/app/types/TypeDTO';

export const metadata: Metadata = {
  title: 'Edit Type'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditTypePage({ params }: Props) {
  const { id } = await params;

  let dtoType: TypeDTO = TYPE;

  try {
    const apolloClient = await createServerApolloClient();
    const result = await apolloClient.query({
      query: GET_TYPE,
      variables: {
        id: parseInt(id)
      }
    });

    if (result?.data?.getType) {
      dtoType = result.data.getType;
    }
  } catch (error) {
    console.error('❌ Error fetching Type data:', error);
  }

  return <ClientEditType dtoType={dtoType} />;
}
