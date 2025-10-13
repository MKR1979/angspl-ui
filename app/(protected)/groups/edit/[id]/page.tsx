import { Metadata } from 'next';
import ClientEditGroup from './client-edit-group';
import { GET_GROUP } from '@/app/graphql/Group';
import { createServerApolloClient } from '@/app/common/utility';
import GroupDTO, { GROUP } from '@/app/types/GroupDTO';
// import ClientEditGroup from './client-edit-group';

export const metadata: Metadata = {
  title: 'Edit Group'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditGroupPage({ params }: Props) {
  const { id } = await params;

  let dtoGroup: GroupDTO = GROUP;

  try {
    const apolloClient = await createServerApolloClient();
    const result = await apolloClient.query({
      query: GET_GROUP,
      variables: {
        id: parseInt(id)
      }
    });

    if (result?.data?.getGroup) {
      dtoGroup = result.data.getGroup;
    }
  } catch (error) {
    console.error('❌ Error fetching Group data:', error);
  }

  return <ClientEditGroup dtoGroup={dtoGroup} />;
}
