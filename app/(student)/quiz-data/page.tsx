'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ClientQuiz from './client-quiz-data';

const QuizContent = () => {
  const searchParams = useSearchParams();
  const quizIdParam = searchParams.get('quizId');
  const quizId = quizIdParam ? Number(quizIdParam) : undefined;
  const quizName = searchParams.get('quizName') ?? '';
  return <ClientQuiz quizId={quizId} quizName={quizName} />;
};

const QuizPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QuizContent />
    </Suspense>
  );
};

export default QuizPage;