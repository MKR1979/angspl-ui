'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewStudyNotes from './useViewStudyNotes';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import StudyNotesDTO from '@/app/types/StudyNotesDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';
import { useSelector, RootState } from '../../../../../store';
import { findPermission } from '../../../../../common/utility-permission';

type Props = {
  dtoStudyNotes: StudyNotesDTO;
};

const ClientViewStudyNotes = ({ dtoStudyNotes }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewStudyNotes({ dtoStudyNotes });
  const userPermissions = useSelector((state: RootState) => state.siteConfigState.userPermission);
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoStudyNotes.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Title:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoStudyNotes.title}</MyTypography>
              </MyBox>
            </MyGrid>
                        <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoStudyNotes.status}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 12 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Description:</MyTypography>
                <MyTypography variant="subtitle2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {state.dtoStudyNotes.description?.code || ''}
                </MyTypography>
              </MyBox>
            </MyGrid>

          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoStudyNotes.created_by_user_name}
          createdAt={state.dtoStudyNotes.created_at}
          modifiedBy={state.dtoStudyNotes.modified_by_user_name}
          modifiedAt={state.dtoStudyNotes.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          {findPermission(userPermissions, 163) && <MyButton onClick={onEditClick}>Edit</MyButton>}
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewStudyNotes, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
