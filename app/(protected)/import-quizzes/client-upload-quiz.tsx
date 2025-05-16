

'use client';
import useUploadQuiz from './useUploadQuiz';

const ClientUploadQuiz = () => {
  const {
    handleFileUpload,
    quizData,
    uploadStatus
  } = useUploadQuiz();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Import Quiz</h2>

      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="mb-4 block"
      />

      {uploadStatus && (
        <p className="text-sm text-blue-600 mt-2">{uploadStatus}</p>
      )}

      {quizData.length > 0 && (
        <div className="mt-6 border p-4 rounded shadow">
          <h3 className="text-lg font-semibold">
            {quizData[0].quiz_name} ({quizData[0].quiz_code})
          </h3>
          <p className="text-sm text-gray-500">
            Total Questions: {
              new Set(quizData.map(q => q.question_id)).size
            }
          </p>

          {quizData.map((q) => (
            <div key={q.option_id} className="mt-4">
              <p className="font-medium">{q.question}</p>
              <ul className="list-disc ml-5">
                <li
                  className={q.is_correct ? 'text-green-600 font-semibold' : ''}
                >
                  {q.option_text} {q.is_correct && '(Correct)'}
                </li>
              </ul>
              <p className="text-sm text-gray-600">
                Explanation: {q.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientUploadQuiz;

