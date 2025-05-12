'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import NotesInsightsPage from './client-notes-insights';

const NotesInsightsContent = () => {
  const searchParams = useSearchParams();
  const courseIdParam = searchParams.get('courseId');
  const courseId = courseIdParam ? Number(courseIdParam) : undefined;
  const courseName = searchParams.get('courseName') ?? '';

  return <NotesInsightsPage courseId={courseId} courseName={courseName} />;
};

const NotesPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NotesInsightsContent />
    </Suspense>
  );
};
export default NotesPage;
