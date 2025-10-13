import BaseDTO from './BaseDTO';
// import LookupDTO from './LookupDTO';

export default interface QuizDTO extends BaseDTO {
  id: number;
  option_code: number;
  option_name: string;
  module_id: number;
  module_name: string;
  status: string;
  //    quizLookupDTO: LookupDTO | null;
}

export const OPTION: QuizDTO = {
  id: 0,
  option_code: 0,
  option_name: '',
  module_id: 0,
  module_name: '',
  status: '',
  //    quizLookupDTO: { id: 0, text: '' },
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
