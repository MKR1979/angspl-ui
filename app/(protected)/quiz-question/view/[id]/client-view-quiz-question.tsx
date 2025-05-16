'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewQuizQuestion from './useViewQuizQuestion';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import QuizQuestionDTO from '@/app/types/QuizQuestionDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoQuizQuestion: QuizQuestionDTO;

};

const ClientViewQuizQuestion = ({ dtoQuizQuestion }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewQuizQuestion({ dtoQuizQuestion });

  return ( 
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Quiz Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizQuestion.quiz_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Question:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizQuestion.question}</MyTypography>
              </MyBox>
            </MyGrid>
           
           <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizQuestion.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoQuizQuestion.created_by_user_name}
          createdAt={state.dtoQuizQuestion.created_at}
          modifiedBy={state.dtoQuizQuestion.modified_by_user_name}
          modifiedAt={state.dtoQuizQuestion.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewQuizQuestion, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
