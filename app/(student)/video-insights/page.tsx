// import { Metadata } from 'next';
// import ClientVideoInsights from './client-video-insights';

// export const metadata: Metadata = {
//   title: 'Video Insights'
// };

// export const revalidate = 0;

// export default async function VideoInsightsPage() {
//   return <ClientVideoInsights></ClientVideoInsights>;
// }

'use client';
import ClientVideoInsights from './client-video-insights';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';


const VideoContent = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const parsedId = courseId ? parseInt(courseId, 10) : NaN;

  if (isNaN(parsedId)) {
    return <ClientVideoInsights></ClientVideoInsights>;
  }

  return <ClientVideoInsights courseId={parsedId} />;
};
export default function VideoInsightsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VideoContent />
    </Suspense>
  );
}
