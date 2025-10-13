import { Metadata } from 'next';
import ClientViewOption from './client-view-option';
import { GET_OPTION } from '@/app/graphql/Option';
import { createServerApolloClient } from '@/app/common/utility';
import OptionDTO, { OPTION } from '@/app/types/OptionDTO';

export const metadata: Metadata = {
  title: 'View Option'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewOptionPage({ params }: Props) {
  const { id } = await params;
  let dtoOption: OptionDTO = OPTION;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_OPTION,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getOption) {
      dtoOption = results[0].data.getOption;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewOption dtoOption={dtoOption}></ClientViewOption>;
}
