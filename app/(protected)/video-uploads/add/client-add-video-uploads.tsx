'use client';
import { memo } from 'react';
import eq from 'lodash/eq';
import MyBreadcrumbs from '@/app/custom-components/MyBreadcrumbs';
import VideoUploadsEntry from '../video-uploads-entry';
import useAddVideoUploads from './useAddVideoUploads';
import { VIDEO_UPLOADS_LIST_ALL } from '@/app/types/VideoUploadsDTO';
import LookupDTO from '@/app/types/LookupDTO';

type Props = { arrCourseLookup: LookupDTO[] };

const ClientAddVideoUploads = ({ arrCourseLookup }: Props) => {
  const { state } = useAddVideoUploads();
  return (
    <>
      <MyBreadcrumbs items={state.breadcrumbsItems}></MyBreadcrumbs>
      <VideoUploadsEntry dtoVideoUploads={VIDEO_UPLOADS_LIST_ALL} arrCourseLookup={arrCourseLookup} />
    </>
  );
};

export default memo(ClientAddVideoUploads, (prevProps, nextProps) => {
  return eq(prevProps, nextProps);
});
