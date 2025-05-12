'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewCourse from './useViewcourse';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import courseDTO from '@/app/types/CourseDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoCourse: courseDTO;
};

const ClientViewCourse = ({ dtoCourse }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewCourse({ dtoCourse });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">course Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">course Code:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.course_code}</MyTypography>
              </MyBox>
            </MyGrid>
           
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">price:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.price}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">duration:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.duration}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">category:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.category}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Thumbnail:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.logo_url}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">documents_path:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoCourse.documents_path}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Status:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoCourse.status}</MyTypography>
                </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Quiz:</MyTypography>
                  <MyTypography variant="subtitle2">
                    {state.dtoCourse.quiz_name ? state.dtoCourse.quiz_name : 'Not Available'}
                  </MyTypography>
                </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
                <MyBox sx={{ mb: 0 }}>
                  <MyTypography>Is Paid:</MyTypography>
                  <MyTypography variant="subtitle2">{state.dtoCourse.is_paid ? 'Yes':'No'}</MyTypography>
                </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoCourse.created_by_user_name}
          createdAt={state.dtoCourse.created_at}
          modifiedBy={state.dtoCourse.modified_by_user_name}
          modifiedAt={state.dtoCourse.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewCourse, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
