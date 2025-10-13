import { Metadata } from 'next';
import ClientViewGroup from './client-view-group';
import { GET_GROUP } from '@/app/graphql/Group';
import { createServerApolloClient } from '@/app/common/utility';
import GroupDTO, { GROUP } from '@/app/types/GroupDTO';

export const metadata: Metadata = {
  title: 'View Group'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewGroupPage({ params }: Props) {
  const { id } = await params;
  let dtoGroup: GroupDTO = GROUP;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_GROUP,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getGroup) {
      dtoGroup = results[0].data.getGroup;
    }
  } catch {}
  return <ClientViewGroup dtoGroup={dtoGroup}></ClientViewGroup>;
}
