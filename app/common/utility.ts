import { ApolloClient, InMemoryCache } from '@apollo/client';
import { cookies } from 'next/headers';

export const createServerApolloClient = async () => {
  const cookieStore = await cookies(); // ✅ Await if it returns a Promise
  const token = cookieStore.get('Adhyayan-token')?.value;
  const companyId = cookieStore.get('company_id')?.value;

  if (!companyId) {
    throw new Error('Missing company_id in cookies');
  }

  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      company_id: companyId,
    },
  });
};

