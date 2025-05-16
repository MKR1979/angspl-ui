'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import VideoUploadsEntry from '../../video-uploads-entry';
import useEditVideoUploads from './useEditVideoUploads';
import VideoUploadsDTO from '@/app/types/VideoUploadsDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { dtoVideoUploads: VideoUploadsDTO; arrCourseLookup: LookupDTO[] };

const ClientEditVideoUploads = ({ dtoVideoUploads, arrCourseLookup }: Props) => {
  const { state } = useEditVideoUploads();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <VideoUploadsEntry dtoVideoUploads={dtoVideoUploads} arrCourseLookup={arrCourseLookup} />
    </>
  );
};

export default memo(ClientEditVideoUploads, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
