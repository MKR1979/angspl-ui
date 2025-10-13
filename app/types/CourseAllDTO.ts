import BaseDTO from './BaseDTO';
export default interface CourseDTO extends BaseDTO {
  id: number;
  course_name: string;
  course_code: string;
  price: number;
  reg_fee: number;
  group_name: string;
  duration: string;
  category: string;
  course_type_id: number;
  course_type_name: string;
  logo_url: string;
  documents_path: string;
  status: string;
  prev_class_marksheet: boolean;
  is10threq: boolean;
  is12threq: boolean;
  isdiplomareq: boolean;
  isgradreq: boolean;
  ispgreq: boolean;
  isphotoidreq: boolean;
  is_aadhar_req: boolean;
  is_birth_certi_req: boolean;
  is_tc_req: boolean;
  is_samagraid_req: boolean;
  is_paid: boolean;
  is_video: boolean;
  is_notes: boolean;
  is_code_project: boolean;
  is_exam: boolean;
}

export const COURSE_LIST_ALL: CourseDTO = {
  id: 0,
  course_name: '',
  course_code: '',
  price: 0,
  reg_fee: 0,
  group_name: '',
  duration: '',
  category: '',
  course_type_id: 0,
  course_type_name: '',
  logo_url: '',
  documents_path: '',
  status: '',
  prev_class_marksheet: false,
  is10threq: false,
  is12threq: false,
  isdiplomareq: false,
  isgradreq: false,
  ispgreq: false,
  isphotoidreq: false,
  is_aadhar_req: false,
  is_birth_certi_req: false,
  is_tc_req: false,
  is_samagraid_req: false,
  is_paid: false,
  is_video: false,
  is_notes: false,
  is_code_project: false,
  is_exam: false,
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
