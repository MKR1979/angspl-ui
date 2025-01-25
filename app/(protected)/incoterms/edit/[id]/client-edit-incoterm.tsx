'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import IncotermEntry from '../../incoterm-entry';
import useEditIncoterm from './useEditIncoterm';
import IncotermDTO from '@/app/types/IncotermDTO';

type Props = { dtoIncoterm: IncotermDTO };

const ClientEditIncoterm = ({ dtoIncoterm }: Props) => {
  const { state } = useEditIncoterm();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <IncotermEntry dtoIncoterm={dtoIncoterm} />
    </>
  );
};

export default memo(ClientEditIncoterm, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
