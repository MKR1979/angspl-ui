import { Metadata } from 'next';
import ClientViewCourseType from './client-view-course-type';
import { GET_COURSE_TYPE } from '@/app/graphql/CourseType';
import { createServerApolloClient } from '@/app/common/utility';
import CourseTypeDTO, { COURSE_TYPE } from '@/app/types/CourseTypeDTO';

export const metadata: Metadata = {
  title: 'View CourseType'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewCourseTypePage({ params }: Props) {
  const { id } = await params;
  let dtoCourseType: CourseTypeDTO = COURSE_TYPE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_COURSE_TYPE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCourseType) {
      dtoCourseType = results[0].data.getCourseType;
    }
  } catch {}
  return <ClientViewCourseType dtoCourseType={dtoCourseType}></ClientViewCourseType>;
}
