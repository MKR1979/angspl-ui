import BaseDTO from './BaseDTO';
export default interface QuizDataDTO extends BaseDTO {
  course_id: number;
  course_name: string;
  quiz_name: string;
  quiz_code: string;
  quiz_type: string;
  exam_duration: number;
  question_id: number;
  question: string;
  option_id: number;
  option_text: string;
  is_correct: boolean;
  explanation_text: string;
  status: string;
  student_id: number;
  quiz_id: number;
  total_questions: number;
  attempted_questions: number;
  unattempted_questions: number;
  correct_answers: number;
  wrong_answers: number;
  percentage: number;
  time_taken_seconds: number;
  passed: boolean;
  attempt_timestamp: Date;
  user_id: number | null;
  user_name: string;
  from_date: Date;
  to_date: Date;
}

export const QUIZ_DATA: QuizDataDTO = {
  id: 0,
  course_id: 0,
  course_name: '',
  quiz_name: '',
  quiz_code: '',
  quiz_type: '',
  exam_duration: 0,
  question_id: 0,
  question: '',
  option_id: 0,
  option_text: '',
  is_correct: false,
  explanation_text: '',
  status: '',
  student_id: 0,
  quiz_id: 0,
  total_questions: 0,
  attempted_questions: 0,
  unattempted_questions: 0,
  correct_answers: 0,
  wrong_answers: 0,
  percentage: 0,
  time_taken_seconds: 0,
  passed: false,
  attempt_timestamp: new Date(),
  user_id: null,
  user_name: '',
  from_date: new Date(),
  to_date: new Date(),
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  created_at: new Date(1899, 11, 31),
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: '',
  modified_at: new Date(1899, 11, 31)
};
