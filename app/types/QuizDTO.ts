import BaseDTO from './BaseDTO';
import LookupDTO from './LookupDTO';

export default interface QuizDTO extends BaseDTO {
  course_id: number;
  course_name: string;
  quiz_name: string;
  quiz_code: string;
  quiz_type: string;
  exam_duration: number;
  status: string;
  quizLookupDTO: LookupDTO | null;
}

export const QUIZ: QuizDTO = {
  id: 0,
  course_id: 0,
  course_name: '',
  quiz_name: '',
  quiz_code: '',
  quiz_type: '',
  exam_duration: 0,
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
