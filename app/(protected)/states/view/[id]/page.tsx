import { Metadata } from 'next';
import ClientViewState from './client-view-state';
import { GET_STATE } from '@/app/graphql/state';
import { createServerApolloClient } from '@/app/common/utility';
import StateDTO, { STATE } from '@/app/types/stateDTO';

export const metadata: Metadata = {
  title: 'View State'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewStatePage({ params }: Props) {
  const { id } = await params;
  let dtoState: StateDTO = STATE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_STATE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getState) {
      dtoState = results[0].data.getState;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewState dtoState={dtoState}></ClientViewState>;
}
