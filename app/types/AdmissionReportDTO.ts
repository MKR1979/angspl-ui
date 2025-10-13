import BaseDTO from './BaseDTO';

export default interface AdmissionReportDTO extends BaseDTO {
  id: number;
  user_id: number | null;
  user_name: string;
  course_id: number | null;
  course_name: string;
  admission_date: Date;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: string;
  email: string;
  phone_no: string;
  address: string;
  city_name: string;
  state_id: number;
  state_name: string;
  country_id: number;
  country_name: string;
  zip_code: string;
  aadhaar_no: string;
  father_name: string;
  father_phone_no: string;
  mother_name: string;
  mother_phone_no: string;
  from_date: Date;
  to_date: Date;
  source_flag: string;
  status: string;
}

export const ADMISSION_REPORT: AdmissionReportDTO = {
  id: 0,
  user_id: null,
  user_name: '',
  course_id: null,
  course_name: '',
  admission_date: new Date(),
  first_name: '',
  last_name: '',
  dob: new Date(),
  gender: '',
  email: '',
  phone_no: '',
  address: '',
  city_name: '',
  state_id: 0,
  state_name: '',
  country_id: 0,
  country_name: '',
  zip_code: '',
  aadhaar_no: '',
  father_name: '',
  father_phone_no: '',
  mother_name: '',
  mother_phone_no: '',
  from_date: new Date(),
  to_date: new Date(),
  source_flag: '',
  status: '',
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
