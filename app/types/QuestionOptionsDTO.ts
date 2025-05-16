import BaseDTO from './BaseDTO';
export default interface QuestionOptionsDTO extends BaseDTO {
  id: number;
  quiz_id: number;
  quiz_name: string;
  question_id: number;
  question: string;
  option_text: string;
  explanation: string;
  is_correct: boolean;
}

export const QUESTION_OPTIONS: QuestionOptionsDTO = {
  id: 0,
  quiz_id: 0,
  quiz_name: '',
  question_id: 0,
  question: '',
  option_text: '',
  explanation: '',
  is_correct: false,
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
