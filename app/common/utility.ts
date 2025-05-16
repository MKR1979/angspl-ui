import { ApolloClient, InMemoryCache } from '@apollo/client';
import { cookies } from 'next/headers';

export const createServerApolloClient = async () => { 
  const cookieStore = await cookies();
  const token: string | undefined = cookieStore.get('Adhyayan-token')?.value;
  const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      company_id:'1'
    }
  });
  return apolloClient;
};

