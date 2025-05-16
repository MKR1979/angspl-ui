
'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import QuestionOptionsEntry from '../../question-options-entry';
import useEditQuestionOptions from './useEditQuestionOptions';
import QuestionOptionsDTO from '@/app/types/QuestionOptionsDTO';

type Props = { dtoQuestionOptions: QuestionOptionsDTO };

const ClientEditQuestionOptions = ({ dtoQuestionOptions }: Props) => {
  const { state } = useEditQuestionOptions();

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <QuestionOptionsEntry dtoQuestionOptions={dtoQuestionOptions} />
    </>
  );
};

export default memo(ClientEditQuestionOptions, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
