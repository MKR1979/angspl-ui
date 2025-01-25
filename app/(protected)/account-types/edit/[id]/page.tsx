import { Metadata } from 'next';
import ClientEditAccountType from './client-edit-account-type';
import { GET_ACCOUNT_TYPE } from '@/app/graphql/AccountType';
import { createServerApolloClient } from '@/app/common/utility';
import AccountTypeDTO, { ACCOUNT_TYPE } from '@/app/types/AccountTypeDTO';

export const metadata: Metadata = {
  title: 'Edit Account Type'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditAccountTypePage({ params }: Props) {
  const { id } = await params;
  let dtoAccountType: AccountTypeDTO = ACCOUNT_TYPE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_ACCOUNT_TYPE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getAccountType) {
      dtoAccountType = results[0].data.getAccountType;
    }
  } catch {}
  return <ClientEditAccountType dtoAccountType={dtoAccountType} />;
}
