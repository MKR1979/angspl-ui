import { Metadata } from 'next';
import ClientVideoInsights from './client-video-insights';

export const metadata: Metadata = {
  title: 'Video Insights'
};

export const revalidate = 0;

export default async function VideoInsightsPage() {
  return <ClientVideoInsights></ClientVideoInsights>;
}
