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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';

type Props = {
  dtoQuizQuestion: QuizQuestionDTO;
};

const ClientViewQuizQuestion = ({ dtoQuizQuestion }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewQuizQuestion({ dtoQuizQuestion });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
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
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoQuizQuestion.status}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Question:</MyTypography>
                <MyTypography
                  variant="subtitle2"
                  sx={{
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {state.dtoQuizQuestion.question}
                </MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid container spacing={2} size={{ xs: 12, md: 12 }}>
              {state.arrOptions.map((opt, index) => (
                <MyGrid key={index} size={{ xs: 12, md: 6 }}>
                  <MyBox
                    sx={{
                      border: '1px solid #ddd',
                      borderRadius: 2,
                      p: 1,
                      backgroundColor: opt.is_correct ? '#e8f5e9' : '#fafafa',
                      boxShadow: opt.is_correct ? '0 0 0 2px #4caf50 inset' : '0 1px 3px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
                        transform: 'translateY(-2px)',
                        cursor: 'pointer'
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.2
                    }}
                  >
                    {/* Option Number + Is Correct on same line */}
                    <MyBox
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', md: 'center' },
                        flexDirection: { xs: 'row', md: 'row' },
                        gap: { xs: 0, md: 10 },
                        flexWrap: 'nowrap',
                        width: '100%'
                      }}
                    >
                      <MyTypography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 500,
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        Option {index + 1}:
                      </MyTypography>
                      <MyBox sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {opt.is_correct ? (
                          <>
                            <CheckCircleIcon sx={{ color: '#4caf50', fontSize: '1.1rem' }} />
                            <MyTypography sx={{ color: '#4caf50', fontWeight: 600, fontSize: '0.9rem' }}>Correct Option</MyTypography>
                          </>
                        ) : (
                          <>
                            <CancelIcon sx={{ color: '#f44336', fontSize: '1.1rem' }} />
                            <MyTypography sx={{ color: '#f44336', fontWeight: 600, fontSize: '0.9rem' }}>Incorrect Option</MyTypography>
                          </>
                        )}
                      </MyBox>
                    </MyBox>
                    {/* Option Text in separate line*/}
                    <MyTypography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 500,
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {opt.option_text}
                    </MyTypography>
                    {/* Explanation in separate line */}
                    <MyTypography
                      variant="body2"
                      sx={{
                        color: '#666',
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      Explanation: {opt.explanation || '—'}
                    </MyTypography>
                  </MyBox>
                </MyGrid>
              ))}
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
          {findPermission(userPermissions, 123) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewQuizQuestion, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
