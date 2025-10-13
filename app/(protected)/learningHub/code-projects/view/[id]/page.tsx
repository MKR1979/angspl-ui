import { Metadata } from 'next';
import ClientViewCodeProject from './client-view-code-project';
import { GET_CODE_PROJECT } from '@/app/graphql/CodeProject';
import { createServerApolloClient } from '@/app/common/utility';
import CodeProjectDTO, { CODE_PROJECT } from '@/app/types/CodeProjectDTO';

export const metadata: Metadata = {
  title: 'View Code Project'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewCodeProjectPage({ params }: Props) {
  const { id } = await params;
  let dtoCodeProject: CodeProjectDTO = CODE_PROJECT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_CODE_PROJECT,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCodeProject) {
      dtoCodeProject = results[0].data.getCodeProject;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewCodeProject dtoCodeProject ={dtoCodeProject}></ClientViewCodeProject>;
}