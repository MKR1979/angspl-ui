import { Metadata } from 'next';
import ClientEditVideoUploads from './client-edit-video-uploads';
import { GET_VIDEO_UPLOADS } from '@/app/graphql/VideoUploads';
import { createServerApolloClient } from '@/app/common/utility';
import VideoUploadsDTO, { VIDEO_UPLOADS_LIST_ALL } from '@/app/types/VideoUploadsDTO';
import LookupDTO from '@/app/types/LookupDTO';
import { COURSE_LOOKUP } from '@/app/graphql/Course';

export const metadata: Metadata = {
  title: 'Edit Video Uploads'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function EditVideoUploadsPage({ params }: Props) {
  const { id } = await params;
  let dtoVideoUploads: VideoUploadsDTO = VIDEO_UPLOADS_LIST_ALL;
  let arrCourseLookup: LookupDTO[] = [];
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_VIDEO_UPLOADS,
      variables: {
        id: parseInt(id)
      }
    });
    const result1 = apolloClient.query({
      query: COURSE_LOOKUP
    });
    const results = await Promise.all([result, result1]);
    if (results[0]?.data?.getVideoUploads) {
      dtoVideoUploads = { ...results[0].data.getVideoUploads };
    }
    if (results[1]?.data?.getCourseLookup) {
      arrCourseLookup = results[1].data.getCourseLookup;
    }
  } catch {}
  return <ClientEditVideoUploads dtoVideoUploads={dtoVideoUploads} arrCourseLookup={arrCourseLookup} />;
}
