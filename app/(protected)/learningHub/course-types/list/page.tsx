import { Metadata } from 'next';
import ClientCourseTypeList from './client-course-type-list';
import { COURSE_TYPE_LIST } from '@/app/graphql/CourseType';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import CourseTypeDTO from '@/app/types/CourseTypeDTO';
export const metadata: Metadata = {
  title: 'CourseTypes'
};

export const revalidate = 0;

export default async function CourseTypeListPage() {
  let arrCourseTypeDTO: CourseTypeDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: COURSE_TYPE_LIST,
      variables: {       
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getCourseTypeList?.course_types) {
      arrCourseTypeDTO = results[0].data.getCourseTypeList.course_types;
    }
    if (results[0]?.data?.getCourseTypeList?.total_records) {
      total_records = results[0].data.getCourseTypeList.total_records;
    }
  } catch {}
  return <ClientCourseTypeList arrCourseTypeDTO={arrCourseTypeDTO} total_records={total_records}></ClientCourseTypeList>;
}
