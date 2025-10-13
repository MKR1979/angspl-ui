'use client';
import { dispatch } from '@/app/store';
import MyTypography from '@/app/custom-components/MyTypography';
import QuizDataDTO from '@/app/types/QuizDataDTO';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Typography, Box, DialogActions, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { setShowQuiz } from '@/app/store/slices/siteConfigState';
import { useMutation } from '@apollo/client';
import { ADD_QUIZ_RESULT } from '@/app/graphql/Quiz';
import { useSelector } from '@/app/store';
import MyButton from '@/app/custom-components/MyButton';
import MyGrid from '@/app/custom-components/MyGrid';
import MyBox from '@/app/custom-components/MyBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ClientQuizProps {
  dtoQuizData: QuizDataDTO;
  quizQuestions: any[];
}

const formatTime = (seconds: number | null) => {
  if (seconds === null || isNaN(seconds)) return '--:--';
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
};

const ClientQuiz: React.FC<ClientQuizProps> = ({ dtoQuizData, quizQuestions }) => {
  const rightAnswersRef = useRef(0);
  const { loginUser_id } = useSelector((state) => state.loginState);
  const [addQuizResult] = useMutation(ADD_QUIZ_RESULT);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [selectedMultiOptions, setSelectedMultiOptions] = useState<{ [key: number]: string[] }>({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [openConfirmSubmit, setOpenConfirmSubmit] = useState(false);

  /// New design start
  const startTimer = useCallback(() => {
    const duration = dtoQuizData.exam_duration;
    if (!duration || duration <= 0) {
      setTimeLeft(null);
      return;
    }
    const totalSeconds = duration * 60;
    setTimeLeft(totalSeconds);
    if (timerRef.current) clearInterval(timerRef.current);
    let remaining = totalSeconds;
    timerRef.current = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        setScore(rightAnswersRef.current);
        setTimeLeft(0);
        stopTimer();
        setQuizCompleted(true);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
  }, [dtoQuizData.exam_duration]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (quizQuestions.length > 0 && !quizCompleted) {
      startTimer();
    }
    return stopTimer;
  }, [quizQuestions, quizCompleted, startTimer, stopTimer]);

  useEffect(() => {
    rightAnswersRef.current = rightAnswers;
  }, [rightAnswers]);

  const handleOptionChange = (index: number, selectedAnswer: string) => {
    const updatedOptions = [...selectedOption];
    const prevAnswer = updatedOptions[currentQuestionIndex];
    updatedOptions[currentQuestionIndex] = selectedAnswer;
    setSelectedOption(updatedOptions);
    const correct = quizQuestions[currentQuestionIndex]?.options.find((opt: any) => opt.is_correct);
    if (!selectedAnswer || !correct) return;
    const correctAnswer = correct.option_text;
    if (!prevAnswer) {
      setAttemptedQuestions(attemptedQuestions + 1);
      if (selectedAnswer === correctAnswer) {
        setRightAnswers(rightAnswers + 1);
      } else {
        setWrongAnswers(wrongAnswers + 1);
      }
    } else {
      const wasCorrect = prevAnswer === correctAnswer;
      const nowCorrect = selectedAnswer === correctAnswer;
      if (wasCorrect && !nowCorrect) {
        setRightAnswers(rightAnswers - 1);
        setWrongAnswers(wrongAnswers + 1);
      } else if (!wasCorrect && nowCorrect) {
        setWrongAnswers(wrongAnswers - 1);
        setRightAnswers(rightAnswers + 1);
      }
    }
  };

  const handleMultiOptionChange = (index: number, selectedMultiAnswer: string) => {
    const prevAnswers = selectedMultiOptions[index] || [];
    let updated = [...prevAnswers];
    if (updated.includes(selectedMultiAnswer)) {
      updated = updated.filter((ans) => ans !== selectedMultiAnswer);
    } else {
      updated.push(selectedMultiAnswer);
    }
    const updatedAll = { ...selectedMultiOptions, [index]: updated };
    setSelectedMultiOptions(updatedAll);
    const correctOptions = quizQuestions[index]?.options
      .filter((opt: any) => opt.is_correct)
      .map((opt: any) => opt.option_text)
      .sort();
    const updatedSorted = [...updated].sort();
    const wasCorrect = JSON.stringify([...prevAnswers].sort()) === JSON.stringify(correctOptions);
    const isCorrect = JSON.stringify(updatedSorted) === JSON.stringify(correctOptions);
    const wasAttempted = prevAnswers.length > 0;
    const isAttempted = updated.length > 0;
    if (!wasAttempted && isAttempted) {
      setAttemptedQuestions((prev) => prev + 1);
      if (isCorrect) setRightAnswers((prev) => prev + 1);
      else setWrongAnswers((prev) => prev + 1);
    } else if (wasAttempted && !isAttempted) {
      // All options deselected
      setAttemptedQuestions((prev) => prev - 1);
      if (wasCorrect) setRightAnswers((prev) => prev - 1);
      else setWrongAnswers((prev) => prev - 1);
    } else if (wasAttempted) {
      if (!wasCorrect && isCorrect) {
        setRightAnswers((prev) => prev + 1);
        setWrongAnswers((prev) => prev - 1);
      } else if (wasCorrect && !isCorrect) {
        setRightAnswers((prev) => prev - 1);
        setWrongAnswers((prev) => prev + 1);
      }
    }
  };

  const onSaveClick = useCallback(async () => {
    const percentage = Number(((score / quizQuestions.length) * 100).toFixed(2));
    try {
      await addQuizResult({
        variables: {
          student_id: loginUser_id,
          course_id: dtoQuizData.course_id,
          quiz_id: dtoQuizData.id,
          total_questions: quizQuestions.length,
          attempted_questions: attemptedQuestions,
          unattempted_questions: quizQuestions.length - attemptedQuestions,
          correct_answers: rightAnswers,
          wrong_answers: wrongAnswers,
          percentage: percentage,
          time_taken_seconds: (dtoQuizData.exam_duration ?? 0) * 60 - (timeLeft ?? 0),
          passed: percentage > 33
        }
      });
      console.log('Quiz saved / submitted Successfully!.');
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  }, [addQuizResult, loginUser_id, dtoQuizData, score, quizQuestions.length, attemptedQuestions, rightAnswers, wrongAnswers, timeLeft]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= quizQuestions.length - 1) {
      setOpenConfirmSubmit(true);
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleConfirmSubmit = () => {
    setScore(rightAnswers);
    setQuizCompleted(true);
    setOpenConfirmSubmit(false);
  };

  const handleCancelSubmit = () => {
    setOpenConfirmSubmit(false);
  };

  useEffect(() => {
    if (quizCompleted && dtoQuizData.quiz_type === 'Graded Exam') {
      setScore(rightAnswers);
      onSaveClick();
    }
  }, [quizCompleted, rightAnswers]);

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedOption([]);
    setSelectedMultiOptions({});
    setAttemptedQuestions(0);
    setRightAnswers(0);
    setWrongAnswers(0);
    setTimeLeft(null);
    startTimer();
  };

  const handleExitQuiz = () => {
    stopTimer();
    setTimeLeft(null);
    dispatch(setShowQuiz(false));
  };

  useEffect(() => {
    if (!dtoQuizData || !quizQuestions || quizQuestions.length === 0) {
      handleExitQuiz();
    }
  }, [dtoQuizData, quizQuestions]);

  const isMultipleCorrect = quizQuestions[currentQuestionIndex]?.options.filter((opt: any) => opt.is_correct).length > 1;

  return (
    <>
      <MyBox sx={{ mb: 2 }}>
        <MyGrid container spacing={2} sx={{ border: '3px solid #eef2f6', p: 2 }}>
          {/* Left Section */}
          <MyGrid size={{ xs: 12, sm: 9 }} sx={{ display: 'flex', gap: { xs: 2, sm: 5 }, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '17px' }}>
                Selected Course:
              </Typography>
              <Typography variant="body1" fontWeight={400}>
                {dtoQuizData.course_name || 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '17px' }}>
                Selected Exam:
              </Typography>
              <Typography variant="body1" fontWeight={400}>
                {dtoQuizData.quiz_name || 'N/A'}
              </Typography>
            </Box>
          </MyGrid>
          <MyGrid
            size={{ xs: 12, sm: 3 }}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              alignItems: 'center'
            }}
          >
            {!quizCompleted && (
              <MyButton onClick={handleExitQuiz} variant="contained">
                Exit Exam
              </MyButton>
            )}
          </MyGrid>
        </MyGrid>
      </MyBox>
      <div className="outmost">
        <div className="quiz-question-container">
          {quizCompleted ? (
            <div className="quiz-result-container">
              <h2>
                Your Score: {score} out of {quizQuestions.length} ({((score / quizQuestions.length) * 100).toFixed(2)}%)
              </h2>
              {dtoQuizData.exam_duration ? (
                <p>Time Taken: {timeLeft === null ? 'Not Timed' : formatTime((dtoQuizData.exam_duration ?? 0) * 60 - timeLeft)}</p>
              ) : null}
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
                      ? '🙂 Good effort! You can do better next time! 👍'
                      : "😓 Don't worry, keep practicing and you'll get better! 🌱"}
              </p>

              <div style={{ display: 'flex', gap: '12px' }}>
                <MyButton onClick={handleRestartQuiz}>Restart Exam</MyButton>
                <MyButton onClick={handleExitQuiz}> Exit Exam </MyButton>
              </div>
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1px',
                  width: '100%'
                }}
              >
                <div className="question-number" style={{ color: 'green', fontSize: '16px', fontWeight: 'bold' }}>
                  <span>
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </span>
                </div>
                {dtoQuizData.exam_duration ? (
                  <div className="quiz-timer-box">
                    <MyTypography
                      variant="subtitle1"
                      style={{
                        color: '#d32f2f',
                        fontWeight: 500,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Time Left: {timeLeft === null ? '(No Time Limit)' : formatTime(timeLeft)}
                    </MyTypography>
                  </div>
                ) : null}
              </div>
              <h3 className="question-text">{quizQuestions[currentQuestionIndex]?.question}</h3>
              {quizQuestions[currentQuestionIndex]?.options.map((option: any, index: number) => (
                <Box
                  key={index}
                  className="option-container"
                  sx={{
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type={isMultipleCorrect ? 'checkbox' : 'radio'}
                      name={!isMultipleCorrect ? `question_${currentQuestionIndex}` : undefined}
                      value={option.option_text ?? ''}
                      checked={
                        isMultipleCorrect
                          ? selectedMultiOptions[currentQuestionIndex]?.includes(option.option_text) || false
                          : selectedOption[currentQuestionIndex] === option.option_text
                      }
                      onChange={() =>
                        isMultipleCorrect
                          ? handleMultiOptionChange(currentQuestionIndex, option.option_text)
                          : handleOptionChange(currentQuestionIndex, option.option_text)
                      }
                      style={{ transform: 'scale(1.5)', marginRight: '10px' }}
                    />
                    {option.option_text}
                  </label>
                </Box>
              ))}
              <div className="button-container">
                <MyButton onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} startIcon={<ArrowBackIcon />}>
                  Prev
                </MyButton>
                <MyButton
                  onClick={handleNextQuestion}
                  endIcon={currentQuestionIndex === quizQuestions.length - 1 ? undefined : <ArrowForwardIcon />}
                >
                  {currentQuestionIndex === quizQuestions.length - 1 ? 'Submit' : 'Next'}
                </MyButton>
              </div>
              <Dialog
                open={openConfirmSubmit}
                onClose={(event, reason) => {
                  if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    handleCancelSubmit();
                  }
                }}
              >
                <DialogTitle>Submit Exam</DialogTitle>
                <DialogContent>
                  <Typography>Are you sure you want to submit the exam?</Typography>
                </DialogContent>
                <DialogActions>
                  <MyButton
                    onClick={handleCancelSubmit}
                    sx={{ backgroundColor: '#6c757d', color: '#fff', '&:hover': { backgroundColor: '#5a6268' } }}
                  >
                    Not Yet
                  </MyButton>
                  <MyButton onClick={handleConfirmSubmit} color="primary" variant="contained">
                    Submit
                  </MyButton>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </div>
        {quizCompleted && (
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
        )}
      </div>
    </>
  );
};

export default ClientQuiz;
