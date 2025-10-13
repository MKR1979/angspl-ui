import { Metadata } from 'next';
import ClientCourseList from './client-course-list';
import { COURSE_LIST } from '@/app/graphql/Course';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import courseDTO from '@/app/types/CourseDTO';
export const metadata: Metadata = {
  title: 'Courses'
};

export const revalidate = 0;

export default async function courseListPage() {
  let arrCourseDTO: courseDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: COURSE_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCourseList?.courses) {
      arrCourseDTO = results[0].data.getCourseList.courses;
    }
    if (results[0]?.data?.getCourseList?.total_records) {
      total_records = results[0].data.getCourseList.total_records;
    }
  } catch {}
  return <ClientCourseList arrCourseDTO={arrCourseDTO} total_records={total_records}></ClientCourseList>;
}
