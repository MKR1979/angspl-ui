import { Metadata } from 'next';
import ClientEditCodeProject from './client-edit-code-project';
import { GET_CODE_PROJECT } from '@/app/graphql/CodeProject';
import { createServerApolloClient } from '@/app/common/utility';
import CodeProjectDTO, { CODE_PROJECT } from '@/app/types/CodeProjectDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COURSE_LOOKUP } from '@/app/graphql/Course';

export const metadata: Metadata = {
  title: 'Edit Code Project'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditCodeProjectPage({ params }: Props) {
  const { id } = await params;
  let dtoCodeProject: CodeProjectDTO = CODE_PROJECT;
  let arrCourseLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_CODE_PROJECT,
      variables: {
        id: parseInt(id)
      }
    });
     const result1 = apolloClient.query({
      query: COURSE_LOOKUP
    });
    const results = await Promise.all([result, result1]);
      if (results[0]?.data?.getCodeProject) {
        dtoCodeProject = results[0].data.getCodeProject;
      }
    if (results[1]?.data?.getCourseLookup) {
      arrCourseLookup = results[1].data.getCourseLookup;
    }
  } catch {}
  return <ClientEditCodeProject dtoCodeProject={dtoCodeProject} arrCourseLookup={arrCourseLookup} />;
}