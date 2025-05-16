'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import CodeInsightPage from './client-code-insight';

const CodeInsightContent = () => {
  const searchParams = useSearchParams();
  const courseIdParam = searchParams.get('courseId');
  const courseId = courseIdParam ? Number(courseIdParam) : undefined;
  const courseName = searchParams.get('courseName') ?? '';

  return <CodeInsightPage courseId={courseId} courseName={courseName} />;
};

const CodePage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CodeInsightContent />
    </Suspense>
  );
};
export default CodePage;