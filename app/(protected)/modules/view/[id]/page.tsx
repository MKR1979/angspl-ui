import { Metadata } from 'next';
import ClientViewModule from './client-view-module';
import { GET_MODULE } from '@/app/graphql/Module';
import { createServerApolloClient } from '@/app/common/utility';
import ModuleDTO, { MODULE } from '@/app/types/ModuleDTO';

export const metadata: Metadata = {
  title: 'View Module'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewModulePage({ params }: Props) {
  const { id } = await params;
  let dtoModule: ModuleDTO = MODULE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_MODULE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getModule) {
      dtoModule = results[0].data.getModule;
    }
  } catch {}
  return <ClientViewModule dtoModule={dtoModule}></ClientViewModule>;
}
