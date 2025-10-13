'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CourseEntry from '../../course-entry';
import useEditCourse from './useEditCourse';
import courseDTO from '@/app/types/CourseDTO';

type Props = { dtoCourse: courseDTO };

const ClientEditCourse = ({ dtoCourse }: Props) => {
  const { state } = useEditCourse();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CourseEntry dtoCourse={dtoCourse} />
    </>
  );
};

export default memo(ClientEditCourse, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
