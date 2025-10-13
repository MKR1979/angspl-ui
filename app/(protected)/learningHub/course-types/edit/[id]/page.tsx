import { Metadata } from 'next';
import ClientEditCoursetype from './client-edit-course-type';
import { GET_COURSE_TYPE} from '@/app/graphql/CourseType';
import { createServerApolloClient } from '@/app/common/utility';
import CourseTypeDTO, { COURSE_TYPE } from '@/app/types/CourseTypeDTO';

export const metadata: Metadata = {
  title: 'Edit Course Type'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditCourseTypePage({ params }: Props) {
  const { id } = await params;

  let dtoCourseType: CourseTypeDTO = COURSE_TYPE;

  try {
    const apolloClient = await createServerApolloClient();
    const result = await apolloClient.query({
      query: GET_COURSE_TYPE,
      variables: {
        id: parseInt(id)
      }
    });

    if (result?.data?.getCourseType) {
      dtoCourseType = result.data.getCourseType;
    }
  } catch (error) {
    console.error('❌ Error fetching Module data:', error);
  }

  return <ClientEditCoursetype dtoCourseType={dtoCourseType} />;
}
