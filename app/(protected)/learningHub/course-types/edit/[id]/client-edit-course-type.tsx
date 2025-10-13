'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CourseTypeEntry from '../../course-type-entry';
import useEditCourseType from './useEditCourseType';
import CourseTypeDTO from '@/app/types/CourseTypeDTO';

type Props = { dtoCourseType: CourseTypeDTO };

const ClientEditCourseType = ({ dtoCourseType }: Props) => {
  const { state } = useEditCourseType();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CourseTypeEntry dtoCourseType={dtoCourseType} />
    </>
  );
};

export default memo(ClientEditCourseType, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
