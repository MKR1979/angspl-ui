'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyButton from '@/app/custom-components/MyButton';
import useViewVideoUploads from './useViewVideoUploads';
import MyTypography from '@/app/custom-components/MyTypography';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import MyCard from '@/app/custom-components/MyCard';
import MyCardContent from '@/app/custom-components/MyCardContent';
import MyDivider from '@/app/custom-components/MyDivider';
import MyCardActions from '@/app/custom-components/MyCardActions';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import VideoUploadsDTO from '@/app/types/VideoUploadsDTO';
import MyTimestamp from '@/app/custom-components/MyTimestamp';

type Props = {
  dtoVideoUploads: VideoUploadsDTO;
};

const ClientViewVideoUploads = ({ dtoVideoUploads }: Props) => {
  const { state, onEditClick, onCancelClick } = useViewVideoUploads({ dtoVideoUploads });

  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <MyCard>
        <MyCardContent>
          <MyGrid container spacing={2}>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Course Name:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoVideoUploads.course_name}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Title:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoVideoUploads.title}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Video Url:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoVideoUploads.video_source}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Tags:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoVideoUploads.tags}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Description:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoVideoUploads.description}</MyTypography>
              </MyBox>
            </MyGrid>
            <MyGrid size={{ xs: 12, md: 6 }}>
              <MyBox sx={{ mb: 0 }}>
                <MyTypography variant="subtitle1">Status:</MyTypography>
                <MyTypography variant="subtitle2">{state.dtoVideoUploads.status}</MyTypography>
              </MyBox>
            </MyGrid>
          </MyGrid>
        </MyCardContent>
        <MyDivider />
        <MyTimestamp
          createdBy={state.dtoVideoUploads.created_by_user_name}
          createdAt={state.dtoVideoUploads.created_at}
          modifiedBy={state.dtoVideoUploads.modified_by_user_name}
          modifiedAt={state.dtoVideoUploads.modified_at}
        ></MyTimestamp>
        <MyCardActions>
          <MyButton onClick={onEditClick}>Edit</MyButton>
          <MyButton onClick={onCancelClick}>Cancel</MyButton>
        </MyCardActions>
      </MyCard>
    </>
  );
};

export default memo(ClientViewVideoUploads, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
