'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import TermEntry from '../../term-entry';
import useEditTerm from './useEditTerm';
import TermDTO from '@/app/types/TermDTO';

type Props = { dtoTerm: TermDTO };

const ClientEditTerm = ({ dtoTerm }: Props) => {
  const { state } = useEditTerm();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <TermEntry dtoTerm={dtoTerm} />
    </>
  );
};

export default memo(ClientEditTerm, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
