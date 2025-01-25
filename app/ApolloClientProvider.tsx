'use client';
import { ApolloClient, InMemoryCache, ApolloProvider, split, ApolloLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createUploadLink } from 'apollo-upload-client';
//import Cookies from "universal-cookie";
import { createClient } from 'graphql-ws';
import { useSelector } from './store';
export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  //const cookies = new Cookies();
  //const token = cookies.get("biz-comrade-token");
  const { token } = useSelector((state) => state.globalState);
  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.NEXT_PUBLIC_SUBSCRIPTION_URL || '',
      connectionParams: () => ({
        authorization: token ? `Bearer ${token}` : ''
      })
    })
  );
  const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL || ''
  });
  const splitLink = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        uploadLink
      )
    : uploadLink;

  // Put authorization token in the header
  const authLink = setContext(() => {
    //const token = pathname.startsWith('/admin') ? cookies.get('med-link-token-admin') : cookies.get('med-link-token');
    //const token = cookies.get('med-link-token');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, splitLink]),
    cache: new InMemoryCache({
      addTypename: false
    })
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
