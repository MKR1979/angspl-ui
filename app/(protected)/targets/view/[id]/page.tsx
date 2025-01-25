import { Metadata } from 'next';
import ClientViewTarget from './client-view-target';
import { GET_TARGET } from '@/app/graphql/Target';
import { createServerApolloClient } from '@/app/common/utility';
import TargetDTO, { TARGET } from '@/app/types/TargetDTO';

export const metadata: Metadata = {
  title: 'View Target'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewTargetPage({ params }: Props) {
  const { id } = await params;
  let dtoTarget: TargetDTO = TARGET;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_TARGET,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getTarget) {
      dtoTarget = results[0].data.getTarget;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewTarget dtoTarget={dtoTarget}></ClientViewTarget>;
}
