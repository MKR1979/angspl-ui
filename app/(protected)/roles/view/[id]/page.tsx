import { Metadata } from 'next';
import ClientViewRole from './client-view-role';
import { GET_ROLE } from '@/app/graphql/Role';
import { createServerApolloClient } from '@/app/common/utility';
import RoleDTO, { ROLE } from '@/app/types/RoleDTO';

export const metadata: Metadata = {
  title: 'View Role'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewRolePage({ params }: Props) {
  const { id } = await params;
  let dtoRole: RoleDTO = ROLE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ROLE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getRole) {
      dtoRole = results[0].data.getRole;
    }
  } catch {}
  return <ClientViewRole dtoRole={dtoRole}></ClientViewRole>;
}
