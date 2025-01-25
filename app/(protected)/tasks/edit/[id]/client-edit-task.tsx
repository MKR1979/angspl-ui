'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import TaskEntry from '../../task-entry';
import useEditTask from './useEditTask';
import TaskDTO from '@/app/types/TaskDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = {
  dtoTask: TaskDTO;
  arrContactLookup: LookupDTO[];
  arrAssignedToLookup: LookupDTO[];
};

const ClientEditTask = ({ dtoTask, arrContactLookup, arrAssignedToLookup }: Props) => {
  const { state } = useEditTask();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <TaskEntry dtoTask={dtoTask} arrContactLookup={arrContactLookup} arrAssignedToLookup={arrAssignedToLookup} />
    </>
  );
};

export default memo(ClientEditTask, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
