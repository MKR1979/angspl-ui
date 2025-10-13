'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CourseTypeEntry from '../course-type-entry';
import useAddCourseType from './useAddCourseType';
import { COURSE_TYPE } from '@/app/types/CourseTypeDTO';

const ClientAddCourseType = () => {
  const { state } = useAddCourseType();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CourseTypeEntry dtoCourseType={COURSE_TYPE} />
    </>
  );
};

export default memo(ClientAddCourseType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
