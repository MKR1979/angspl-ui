import { Metadata } from 'next';
import ClientEditTarget from './client-edit-target';
import { GET_TARGET } from '@/app/graphql/Target';
import { createServerApolloClient } from '@/app/common/utility';
import TargetDTO, { TARGET } from '@/app/types/TargetDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COUNTRY_LOOKUP } from '@/app/graphql/Country';
import { USER_LOOKUP } from '@/app/graphql/User';

export const metadata: Metadata = {
  title: 'Edit Target'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditTargetPage({ params }: Props) {
  const { id } = await params;
  let dtoTarget: TargetDTO = TARGET;
  let arrCountryLookup: LookupDTO[] = [];
  let arrAssignedToLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_TARGET,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: COUNTRY_LOOKUP
    });
    const result2 = apolloClient.query({
      query: USER_LOOKUP
    });

    const results = await Promise.all([result, result1, result2]);
    if (results[0]?.data?.getTarget) {
      dtoTarget = results[0].data.getTarget;
    }
    if (results[1]?.data?.getCountryLookup) {
      arrCountryLookup = results[1].data.getCountryLookup;
    }
    if (results[2]?.data?.getUserLookup) {
      arrAssignedToLookup = results[2].data.getUserLookup;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientEditTarget dtoTarget={dtoTarget} arrCountryLookup={arrCountryLookup} arrAssignedToLookup={arrAssignedToLookup} />;
}
