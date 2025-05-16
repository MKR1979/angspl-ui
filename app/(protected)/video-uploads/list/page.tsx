import { Metadata } from 'next';
import ClientVideoUploadsList from './client-video-uploads-list';
import { VIDEO_UPLOADS_LIST } from '@/app/graphql/VideoUploads';
import { defaultPageSize } from '@/app/common/Configuration';
import { createServerApolloClient } from '@/app/common/utility';
import VideoUploadsDTO from '@/app/types/VideoUploadsDTO';
export const metadata: Metadata = {
  title: 'Video Uploads'
};

export const revalidate = 0;

export default async function VideoUploadListPage() {
  let arrVideoUploadsDTO: VideoUploadsDTO[] = [];
  let total_records: number = 0;
  try {
    const apolloClient = await createServerApolloClient();
    const result = apolloClient.query({
      query: VIDEO_UPLOADS_LIST,
      variables: {
        filter_text: '',
        sort_field: 'id',
        sort_direction: 'desc',
        offset: 0,
        limit: defaultPageSize
      }
    });
    const results = await Promise.all([result]);
    if (results[0]?.data?.getVideoUploadsList?.videoUploads) {
      arrVideoUploadsDTO = results[0].data.getVideoUploadsList.videoUploads;
    }
    if (results[0]?.data?.getVideoUploadsList?.total_records) {
      total_records = results[0].data.getVideoUploadsList.total_records;
    }
  } catch {}
  return <ClientVideoUploadsList arrVideoUploadsDTO={arrVideoUploadsDTO} total_records={total_records}></ClientVideoUploadsList>;
}
