'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import GroupEntry from '../../group-entry';
import useEditGroup from './useEditGroup';
import GroupDTO from '@/app/types/GroupDTO';

type Props = { dtoGroup: GroupDTO };

const ClientEditGroup = ({ dtoGroup }: Props) => {
  const { state } = useEditGroup();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <GroupEntry dtoGroup={dtoGroup} />
    </>
  );
};

export default memo(ClientEditGroup, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
