import BaseDTO from './BaseDTO';
export default interface QuizDataDTO extends BaseDTO {
  quiz_name: string;
  quiz_code: string;
  question_id: number;
  question: string;
  option_id: number;
  option_text: string;
  is_correct: boolean;
  explanation_text: string;
  status: string;
}

export const QUIZ_DATA: QuizDataDTO = {
  id: 0,
  quiz_name: '',
  quiz_code: '',
  question_id: 0,
  question: '',
  option_id: 0,
  option_text: '',
  is_correct: false,
  explanation_text: '',
  status: '',
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
