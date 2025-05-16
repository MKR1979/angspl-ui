import BaseDTO from './BaseDTO';
import LookupDTO from './LookupDTO';

export default interface QuizQuestionDTO extends BaseDTO {
  id: number;
  quiz_id: number;
  quiz_name: string;
  question: string;
  explanation: string;
  status: string;
  quizLookupDTO: LookupDTO | null;
}

export const QUIZ_QUESTION: QuizQuestionDTO = {
  id: 0,
  quiz_id: 0,
  quiz_name: '',
  question: '',
  explanation: '',
  status: '',
  quizLookupDTO: { id: 0, text: '' },
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
