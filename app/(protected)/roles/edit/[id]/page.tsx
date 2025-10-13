import { Metadata } from 'next';
import ClientEditRole from './client-edit-role';
import { GET_ROLE } from '@/app/graphql/Role';
import { createServerApolloClient } from '@/app/common/utility';
import RoleDTO, { ROLE } from '@/app/types/RoleDTO';

export const metadata: Metadata = {
  title: 'Edit Role'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditRolePage({ params }: Props) {
  const { id } = await params;
  console.log('🔍 Role Edit Page - ID:', id); // Debug point

  let dtoRole: RoleDTO = ROLE;

  try {
    const apolloClient = await createServerApolloClient();
    console.log('🔍 Apollo Client initialized'); // Debug point

    const result = await apolloClient.query({
      query: GET_ROLE,
      variables: {
        id: parseInt(id)
      }
    });

    console.log('🔍 Query result:', result?.data); // Debug point

    if (result?.data?.getRole) {
      dtoRole = result.data.getRole;
    }
  } catch (error) {
    console.error('❌ Error fetching role data:', error);
  }

  return <ClientEditRole dtoRole={dtoRole} />;
}
