// 'use client';
// import { useSearchParams } from 'next/navigation';
// import { Suspense } from 'react';
// import ClientGenInstruction from './client-gen-instructions';

// const QuizExamContent = () => {
//   const searchParams = useSearchParams();
//   const courseIdParam = searchParams.get('courseId');
//   const courseId = courseIdParam ? Number(courseIdParam) : undefined;

//   return <ClientGenInstruction courseId={courseId} />;
// };

// const QuizPage = () => {
//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       <QuizExamContent />
//     </Suspense>
//   );
// };
// export default QuizPage;




'use client';
import ClientGenInstruction from './client-gen-instructions';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';


const QuizExamContent = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const parsedId = courseId ? parseInt(courseId, 10) : NaN;

  if (isNaN(parsedId)) {
    return <ClientGenInstruction></ClientGenInstruction>;
  }

  return <ClientGenInstruction courseId={parsedId} />;
};
export default function VideoInsightsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QuizExamContent />
    </Suspense>
  );
}
