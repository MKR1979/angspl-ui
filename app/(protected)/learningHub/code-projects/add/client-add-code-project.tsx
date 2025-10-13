'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import CodeProjectEntry from '../code-project-entry';
import useAddCodeProject from './useAddCodeProject';
import { CODE_PROJECT } from '@/app/types/CodeProjectDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { arrCourseLookup: LookupDTO[] };
const ClientAddCodeProject = ({ arrCourseLookup }: Props) => {
  const { state } = useAddCodeProject();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <CodeProjectEntry dtoCodeProject={CODE_PROJECT} arrCourseLookup={arrCourseLookup}/>
    </>
  );
};

export default memo(ClientAddCodeProject, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});