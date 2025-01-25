import { Metadata } from 'next';
import ClientViewAccount from './client-view-account';
import { GET_ACCOUNT } from '@/app/graphql/Account';
import { createServerApolloClient } from '@/app/common/utility';
import AccountDTO, { ACCOUNT } from '@/app/types/AccountDTO';

export const metadata: Metadata = {
  title: 'View Account'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewAccountPage({ params }: Props) {
  const { id } = await params;
  let dtoAccount: AccountDTO = ACCOUNT;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ACCOUNT,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAccount) {
      dtoAccount = results[0].data.getAccount;
    }
  } catch {}
  return <ClientViewAccount dtoAccount={dtoAccount}></ClientViewAccount>;
}
