import { Metadata } from 'next';
import ClientViewStage from './client-view-stage';
import { GET_STAGE } from '@/app/graphql/Stage';
import { createServerApolloClient } from '@/app/common/utility';
import StageDTO, { STAGE } from '@/app/types/StageDTO';

export const metadata: Metadata = {
  title: 'View Stage'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewStagePage({ params }: Props) {
  const { id } = await params;
  let dtoStage: StageDTO = STAGE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_STAGE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getStage) {
      dtoStage = results[0].data.getStage;
    }
  } catch {}
  return <ClientViewStage dtoStage={dtoStage}></ClientViewStage>;
}
