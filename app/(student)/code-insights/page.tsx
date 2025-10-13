// 'use client';
// import { useSearchParams } from 'next/navigation';
// import { Suspense } from 'react';
// import CodeInsightPage from './client-code-insight';

// const CodeInsightContent = () => {
//   const searchParams = useSearchParams();
//   const courseIdParam = searchParams.get('courseId');
//   const courseId = courseIdParam ? Number(courseIdParam) : undefined;
//   const courseName = searchParams.get('courseName') ?? '';

//   return <CodeInsightPage courseId={courseId} courseName={courseName} />;
// };

// const CodePage = () => {
//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       <CodeInsightContent />
//     </Suspense>
//   );
// };
// export default CodePage;
'use client';
import ClientCodeInsights from './client-code-insight';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';


const CodeContent = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const parsedId = courseId ? parseInt(courseId, 10) : NaN;

  if (isNaN(parsedId)) {
    return <ClientCodeInsights></ClientCodeInsights>;
  }

  return <ClientCodeInsights courseId={parsedId} />;
};
export default function CodeInsightsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CodeContent />
    </Suspense>
  );
}
