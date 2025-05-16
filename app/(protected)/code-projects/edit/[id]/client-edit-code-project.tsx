'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CodeProjectEntry from '../../code-project-entry';
import useEditCodeProject from './useEditCodeProject';
import CodeProjectDTO from '@/app/types/CodeProjectDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoCodeProject: CodeProjectDTO; arrCourseLookup: LookupDTO[] };

const ClientEditCodeProject = ({ dtoCodeProject, arrCourseLookup}: Props) => {
  const { state } = useEditCodeProject();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CodeProjectEntry dtoCodeProject={dtoCodeProject} arrCourseLookup={arrCourseLookup} />
    </>
  );
};

export default memo(ClientEditCodeProject, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});