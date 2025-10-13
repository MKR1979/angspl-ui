'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewQuizResult from './useViewQuizResult';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import QuizDataDTO from '@/app/types/QuizDataDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector } from '../../../../store';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  dtoQuizData: QuizDataDTO;
};

const ClientViewQuizResult = ({ dtoQuizData }: Props) => {
  const { state, onCancelClick } = useViewQuizResult({ dtoQuizData });
  const { siteConfig } = useSelector((state: { siteConfigState: any; }) => state.siteConfigState);
  const customerTimezone = siteConfig.find((c: { key: string; }) => c.key === 'CUSTOMER_TIMEZONE')?.value ?? '';

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Student Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.user_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Quiz Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.quiz_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Quiz Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.quiz_code}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Quiz Type:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.quiz_type}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Exam Date:</MyTypography>
                <MyTypography variant="subtitle2">
                       {state.dtoQuizData?.attempt_timestamp &&
                    dayjs(state.dtoQuizData.attempt_timestamp).format('DD/MM/YYYY') !== '12/31/1899'
                    ? dayjs(state.dtoQuizData.attempt_timestamp).tz(customerTimezone).format('DD/MM/YYYY hh:mm A') // or 'DD/MM/YYYY' if you prefer
                    : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Exam Duration:</MyTypography>
                <MyTypography variant="subtitle2">
                  {state.dtoQuizData.exam_duration ? `${state.dtoQuizData.exam_duration} min` : 'N/A'}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Total Questions:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.total_questions}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Attempted Questions:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.attempted_questions}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Non-attempted Questions:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.unattempted_questions}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Correct Answers:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.correct_answers}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Wrong Answers:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.wrong_answers}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Percentage:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.percentage}%</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Time Taken:</MyTypography>
                <MyTypography variant="subtitle2">
                  {Math.floor(state.dtoQuizData.time_taken_seconds / 60)} min {state.dtoQuizData.time_taken_seconds % 60} sec
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Result:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizData.passed ? 'Pass' : 'Fail'}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoQuizData.created_by_user_name}
          createdAt={state.dtoQuizData.created_at}
          modifiedBy={state.dtoQuizData.modified_by_user_name}
          modifiedAt={state.dtoQuizData.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onCancelClick}>Close</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewQuizResult, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
