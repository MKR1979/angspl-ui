'use client';
import './quiz.css';
import useQuiz from './useQuizData';
import MyGrid from '@/app/custom-components/MyGrid';
import MyAutocomplete from '@/app/custom-components/MyAutocomplete';
import MyTextField from '@/app/custom-components/MyTextField';
import MyTypography from '@/app/custom-components/MyTypography';
interface ClientQuizProps {
  quizId?: number;
  quizName?: string;
}

const ClientQuiz = (props: ClientQuizProps) => {
  const {
    state,
    quizId,
    handleOptionChange,
    handleNextQuestion,
    handleRestartQuiz,
    quizCompleted,
    handlePreviousQuestion,
    rightAnswers,
    attemptedQuestions,
    wrongAnswers,
    currentQuestionIndex,
    selectedOption,
    quizQuestions,
    score,
    onQuizNameChange,
    setOpen1,
    setClose1
  } = useQuiz(props);

  return (
    <>
      <div className="quiz-container">
        <div className="course-tabs-wrapper">
          <MyGrid size={{ xs: 12, sm: 1 }} style={{ width: '400px' }}>
            <MyAutocomplete
              className="my-autocomplete"
              open={state.open1}
              onOpen={quizId ? undefined : setOpen1}
              onClose={quizId ? undefined : setClose1}
              value={state.arrQuizLookup.find((opt) => opt.id === (quizId ?? state.dtoQuizData.id)) ?? { id: 0, text: '' }}
              getOptionLabel={(option: any) => option?.text ?? ''}
              firstitem={{ id: 0, text: '' }}
              options={state.arrQuizLookup}
              onChange={onQuizNameChange}
              filterOptions={(options, state) => {
                // lookup also works as search bar
                const searchTerm = state.inputValue.toLowerCase();
                return options.filter((option: any) => option.text && option.text.toLowerCase().includes(searchTerm));
              }}
              onInputChange={(event, newInputValue) => {
                console.log('User input:', newInputValue);
              }} // code ends here for using lookup as search bar.
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Quizzes."
                  className="quiz-input"
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                />
              )}
            />
            <MyTypography className="error">{state.errorMessages.quiz_name}</MyTypography>
          </MyGrid>
        </div>
      </div>
      <div className="outmost">
        {state.isLoading && (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}
        <div className="quiz-question-container">
          {quizCompleted ? (
            <div className="quiz-result-container">
              <h2>
                Your Score: {score} out of {quizQuestions.length} ({((score / quizQuestions.length) * 100).toFixed(2)}%)
              </h2>
              <p
                style={{
                  color:
                    score === quizQuestions.length
                      ? 'green'
                      : score >= quizQuestions.length * 0.75
                        ? 'blue'
                        : score >= quizQuestions.length * 0.5
                          ? 'orange'
                          : 'red'
                }}
              >
                {score === quizQuestions.length
                  ? '🏆🎉 Congratulations! You got all the answers right! 🌟🏆'
                  : score >= quizQuestions.length * 0.75
                    ? "👏 Great job! You're almost there! 💪"
                    : score >= quizQuestions.length * 0.5
                      ? '🙂Good effort! You can do better next time!👍'
                      : "😓 Don't worry, keep practicing and you'll get better! 🌱"}
              </p>
              <button onClick={handleRestartQuiz}>Restart Quiz</button>
            </div>
          ) : (
            <div className="quiz-question-wrapper">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`
                  }}
                ></div>
              </div>

              <div className="question-number">
                <span>
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
              </div>

              <h2>{quizQuestions[currentQuestionIndex]?.question}</h2>
              {quizQuestions[currentQuestionIndex]?.options.map((option: any, index: number) => (
                <div key={index} className="option-container">
                  <label>
                    <input
                      type="radio"
                      name={`question_${currentQuestionIndex}`}
                      value={option.option_text}
                      checked={selectedOption[currentQuestionIndex] === option.option_text}
                      onChange={() => handleOptionChange(currentQuestionIndex, option.option_text)}
                    />
                    {option.option_text}
                  </label>
                </div>
              ))}

              <div className="button-container">
                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="quiz-nav-button">
                  ←Prev
                </button>
                <button onClick={handleNextQuestion} className="quiz-nav-button">
                  Next→
                </button>
              </div>
            </div>
          )}
        </div>

        {quizCompleted ? (
          <div className="quiz-status-box">
            <h5>
              <strong>Quiz Summary -</strong>
            </h5>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-heading">Total Questions :</span>
                <span className="stat-value">{quizQuestions.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-heading">Attempted Questions :</span>
                <span className="stat-value">{attemptedQuestions}</span>
              </div>
              <div className="stat-item">
                <span className="stat-heading">
                  <strong>Non-Attempted Questions :</strong>
                </span>
                <span className="stat-value">{quizQuestions.length - attemptedQuestions}</span>
              </div>
              <div className="stat-item">
                <span className="stat-heading">Right Answers :</span>
                <span className="stat-value">{rightAnswers}</span>
              </div>
              <div className="stat-item">
                <span className="stat-heading">Wrong Answers :</span>
                <span className="stat-value">{wrongAnswers}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default ClientQuiz;
