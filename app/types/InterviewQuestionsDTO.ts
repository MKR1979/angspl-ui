import BaseDTO from './BaseDTO';
import LookupDTO from './LookupDTO';

export default interface InterviewQuestionsDTO extends BaseDTO {
  id: number;
  course_id: number;
  course_name: string;
  title: string;
  description: Record<string, any>;
  status: string;
  courseLookupDTO: LookupDTO | null;
}

export const INTERVIEW_QUESTIONS: InterviewQuestionsDTO = {
  id: 0,
  course_id: 0,
  course_name: '',
  title: '',
  description: {},
  status: '',
  courseLookupDTO: { id: 0, text: '' },
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
