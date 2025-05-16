import BaseDTO from './BaseDTO';
export default interface CourseDTO extends BaseDTO {
  id: number;
  course_name: string;
  course_code: string;
  price: number; 
  duration: string;
  category: string;
  logo_url: string;
  documents_path:string;
  status: string;
  is10threq:boolean;
  is12threq:boolean;
  isgradreq:boolean;
  ispgreq:boolean;
  isphotoidreq:boolean;
  quiz_id: number;
  quiz_name: string;
  is_paid:boolean;
  code_project_id: number;
  code_project_title: string;
}

export const COURSE_LIST_ALL: CourseDTO = {
  id: 0,
  course_name: '',
  course_code: '',
  price: 0, 
  duration: '',
  category: '',
  logo_url:'',
  documents_path:'', 
  status: '',
  is10threq: false,
  is12threq: false,
  isgradreq: false,
  ispgreq: false,
  isphotoidreq: false,
  quiz_id: 0,
  quiz_name: '',
  is_paid: false,  
  code_project_id: 0,
  code_project_title:'',
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
