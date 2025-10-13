import BaseDTO from './BaseDTO';

export default interface EmpMasterDTO extends BaseDTO {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  emp_code: string;
  joining_date: Date;
  department_type: string;
  qualification: string;
  experience: number;
  designation: string;
  salary: number;
  dob: Date | null;
  gender: string;
  email: string;
  phone_no: string;
  marital_status: string;
  father_name: string;
  mother_name: string;
  husband_wife_name: string;
  address: string;
  aadhaar_no: string;
  pan_card: string;
  status: string;
  photo: File | null;
  photoidproof: File | null;
  from_date: Date;
  to_date: Date;
}

export const EMP_MASTER: EmpMasterDTO = {
  id: 0,
  first_name: '',
  last_name: '',
  user_name: '',
  emp_code: '',
  joining_date: new Date(),
  department_type: '',
  qualification: '',
  experience: 0,
  designation: '',
  salary: 0,
  dob: null,
  gender: '',
  email: '',
  phone_no: '',
  marital_status: '',
  father_name: '',
  mother_name: '',
  husband_wife_name: '',
  address: '',
  aadhaar_no: '',
  pan_card: '',
  status: '',
  photo: null,
  photoidproof: null,
  from_date: new Date(),
  to_date: new Date(),
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  created_at: new Date(),
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: '',
  modified_at: new Date()
};
