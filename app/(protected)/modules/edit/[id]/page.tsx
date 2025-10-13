import { Metadata } from 'next';
import ClientEditModule from './client-edit-module';
import { GET_MODULE } from '@/app/graphql/Module';
import { createServerApolloClient } from '@/app/common/utility';
import ModuleDTO, { MODULE } from '@/app/types/ModuleDTO';

export const metadata: Metadata = {
  title: 'Edit Module'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditModulePage({ params }: Props) {
  const { id } = await params;

  let dtoModule: ModuleDTO = MODULE;

  try {
    const apolloClient = await createServerApolloClient();
    const result = await apolloClient.query({
      query: GET_MODULE,
      variables: {
        id: parseInt(id)
      }
    });

    if (result?.data?.getModule) {
      dtoModule = result.data.getModule;
    }
  } catch (error) {
    console.error('❌ Error fetching Module data:', error);
  }

  return <ClientEditModule dtoModule={dtoModule} />;
}
