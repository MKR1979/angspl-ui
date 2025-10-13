import { Metadata } from 'next';
import ClientViewCourse from './client-view-course';
import { GET_COURSE } from '@/app/graphql/Course';
import { createServerApolloClient } from '@/app/common/utility';
import courseDTO, { COURSE } from '@/app/types/CourseDTO';

export const metadata: Metadata = {
  title: 'View Course'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewStatePage({ params }: Props) {
  const { id } = await params;
  let dtoCourse: courseDTO = COURSE;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_COURSE,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCourse) {
      dtoCourse = results[0].data.getCourse;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewCourse dtoCourse={dtoCourse}></ClientViewCourse>;
}
