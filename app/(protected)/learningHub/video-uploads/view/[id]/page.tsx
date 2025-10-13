import { Metadata } from 'next';
import ClientViewVideoUploads from './client-view-video-uploads';
import { GET_VIDEO_UPLOADS } from '@/app/graphql/VideoUploads';
import { createServerApolloClient } from '@/app/common/utility';
import VideoUploadsDTO, { VIDEO_UPLOADS_LIST_ALL } from '@/app/types/VideoUploadsDTO';

export const metadata: Metadata = {
  title: 'View Video Uploads'
};

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

export default async function ViewVideoUploadsPage({ params }: Props) {
  const { id } = await params;
  let dtoVideoUploads: VideoUploadsDTO = VIDEO_UPLOADS_LIST_ALL;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: GET_VIDEO_UPLOADS,
      variables: {
        id: parseInt(id)
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getVideoUploads) {
      dtoVideoUploads = results[0].data.getVideoUploads;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
  return <ClientViewVideoUploads dtoVideoUploads={dtoVideoUploads}></ClientViewVideoUploads>;
}
