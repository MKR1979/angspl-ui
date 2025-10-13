
'use client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  ApolloLink
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';
import { useSelector } from './store';

export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  const { companyInfo } = useSelector((state) => state.globalState); 
  const { token } = useSelector((state) => state.loginState);
  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.NEXT_PUBLIC_SUBSCRIPTION_URL || '',
      connectionParams: () => ({
        authorization: token ? `Bearer ${token}` : '',
        company_id: companyInfo.company_id 

      })
    })
  );

  const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL || ''
  });

  const splitLink = typeof window !== 'undefined'
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        uploadLink
      )
    : uploadLink;

  const authLink = setContext(() => {
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        company_id: companyInfo.company_id 
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

// 'use client';

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   split,
//   ApolloLink
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { getMainDefinition } from '@apollo/client/utilities';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createUploadLink } from 'apollo-upload-client';
// import { createClient } from 'graphql-ws';

// import { useSelector } from './store'; // Adjust path if needed

// export function ApolloClientProvider({ children }: { children: React.ReactNode }) {
//   const { companyInfo } = useSelector((state) => state.globalState);
//   const { token } = useSelector((state) => state.loginState);

//   // WebSocket Link for subscriptions
//   const wsLink = typeof window !== 'undefined'
//     ? new GraphQLWsLink(
//         createClient({
//           url: process.env.NEXT_PUBLIC_SUBSCRIPTION_URL || '',
//           connectionParams: () => ({
//             authorization: token ? `Bearer ${token}` : '',
//             company_id: companyInfo?.company_id ?? ''
//           })
//         })
//       )
//     : undefined;

//   // HTTP Upload Link
//   const uploadLink = createUploadLink({
//     uri: process.env.NEXT_PUBLIC_API_URL || '',
//     credentials: 'include'
//   });

//   // Auth Header
//   const authLink = setContext((_, { headers }) => ({
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : '',
//       company_id: companyInfo?.company_id ?? ''
//     }
//   }));

//   // Split Link (subscriptions over ws, queries/mutations over http)
//   const splitLink =
//     typeof window !== 'undefined' && wsLink
//       ? split(
//           ({ query }) => {
//             const def = getMainDefinition(query);
//             return (
//               def.kind === 'OperationDefinition' &&
//               def.operation === 'subscription'
//             );
//           },
//           wsLink,
//           uploadLink
//         )
//       : uploadLink;

//   const client = new ApolloClient({
//     link: ApolloLink.from([authLink, splitLink]),
//     cache: new InMemoryCache({
//       addTypename: false
//     })
//   });

//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// }
