'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewQuestionOptions from './useViewQuestionOptions';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import QuestionOptionsDTO from '@/app/types/QuestionOptionsDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';

type Props = {
  dtoQuestionOptions: QuestionOptionsDTO;
};

const ClientViewQuestionOptions = ({ dtoQuestionOptions }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewQuestionOptions({ dtoQuestionOptions });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Quiz:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuestionOptions.quiz_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Question:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuestionOptions.question}</MyTypography>
              </MyBox>
            </MyGrid>

            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Option-text:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuestionOptions.option_text}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">isCorrect:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuestionOptions.is_correct ? 'true' : 'false'}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Explanation:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuestionOptions.explanation}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoQuestionOptions.created_by_user_name}
          createdAt={state.dtoQuestionOptions.created_at}
          modifiedBy={state.dtoQuestionOptions.modified_by_user_name}
          modifiedAt={state.dtoQuestionOptions.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 113) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewQuestionOptions, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
