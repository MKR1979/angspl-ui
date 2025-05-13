'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CourseEntry from '../course-entry';
import { COURSE } from '@/app/types/CourseDTO';
import useAddCourse from './useAddCourse';
const ClientAddCourse = () => {
  const { state } = useAddCourse();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CourseEntry dtoCourse={COURSE} />
    </>
  );
};

export default memo(ClientAddCourse, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
