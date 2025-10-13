
import { Metadata } from 'next';
import ClientEditOption from './client-edit-option';
import { GET_OPTION } from '@/app/graphql/Option';
import { createServerApolloClient } from '@/app/common/utility';
import OptionDTO, { OPTION } from '@/app/types/OptionDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { MODULE_LOOKUP } from '@/app/graphql/Module';

export const metadata: Metadata = {
  title: 'Edit Option'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditOptionPage({ params }: Props) {
  const { id } = await params;
  let dtoOption: OptionDTO = OPTION;
  let arrModuleLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_OPTION,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
          query: MODULE_LOOKUP
        });
    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getOption) {
      dtoOption = { ...results[0].data.getOption };
    }
    if (results[1]?.data?.getCourseLookup) {
      arrModuleLookup = results[1].data.getModuleLookup;
    }
  } catch {}
  return <ClientEditOption dtoOption={dtoOption} arrModuleLookup={arrModuleLookup} />;
}