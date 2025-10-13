'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import GroupEntry from '../group-entry';
import useAddGroup from './useAddGroup';
import { GROUP } from '@/app/types/GroupDTO';

const ClientAddGroup = () => {
  const { state } = useAddGroup();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <GroupEntry dtoGroup={GROUP} />
    </>
  );
};

export default memo(ClientAddGroup, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
