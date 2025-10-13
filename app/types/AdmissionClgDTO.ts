import BaseDTO from './BaseDTO';

export default interface AdmissionClgDTO extends BaseDTO {
  id: number;
  course_id: number;
  course_name: string;
  admission_date: Date;
  course_type_id: number;
  course_type_name: string;
  entry_type: string;
  gender: string;
  first_name: string;
  last_name: string;
  user_name: string;
  father_name: string;
  mother_name: string;
  dob: Date | null;
  category: string;
  address: string;
  district_id: number;
  district_name: string;
  state_id: number;
  state_name: string;
  country_id: number;
  country_name: string;
  city_name: string;
  zip_code: string;
  corr_address: string;
  corr_district_id: number;
  corr_district_name: string;
  corr_state_id: number;
  corr_state_name: string;
  corr_country_id: number;
  corr_country_name: string;
  corr_city_name: string;
  corr_zip_code: string;
  email: string;
  phone_no: string;
  religion: string;
  blood_group: string;
  medium: string;
  father_qualification: string;
  father_occupation: string;
  father_organisation: string;
  father_designation: string;
  father_phone_no: string;
  father_email: string;
  mother_qualification: string;
  mother_occupation: string;
  mother_organisation: string;
  mother_designation: string;
  mother_phone_no: string;
  mother_email: string;
  student_aadhaar_no: string;
  father_aadhaar_no: string;
  mother_aadhaar_no: string;
  samagra_id_no: string;
  staff_child: string;
  sibling_in_college: string;
  parents_ex_college: string;
  guardian_name: string;
  guardian_phone_no: string;
  undertaking: string;
  iii_language: string;
  transport_facility: string;
  transport_route: string;
  hostel_facility: string;
  hostel_occupancy: string;
  mess_facility: string;
  ii_language: string;
  stream: string;
  family_samagra_id: string;
  student_pen_no: string;
  high_school_board: string;
  high_school_year: string;
  high_school_roll_no: string;
  high_school_percentage: number;
  intermediate_board: string;
  intermediate_year: string;
  intermediate_roll_no: string;
  intermediate_stream: string;
  intermediate_percentage: number;
  diploma_college: string;
  diploma_university: string;
  diploma_registration_no: string;
  diploma_course_id: number;
  diploma_course_name: string;
  diploma_passing_year: string;
  diploma_cgpa: number;
  ug_college: string;
  ug_university: string;
  ug_registration_no: string;
  ug_course_id: number;
  ug_course_name: string;
  ug_passing_year: string;
  ug_cgpa: number;
  pg_college: string;
  pg_university: string;
  pg_registration_no: string;
  pg_course_id: number;
  pg_course_name: string;
  pg_passing_year: string;
  pg_cgpa: number;
  scholarship_student: string;
  photo: File | null;
  aadhaar_card: File | null;
  other_certificate: File | null;
  father_aadhaar: File | null;
  mother_aadhaar: File | null;
  samagra_id: File | null;
  transfer_certificate: File | null;
  high_school_marksheet: File | null;
  intermediate_marksheet: File | null;
  diploma_marksheet: File | null;
  ug_marksheet: File | null;
  pg_marksheet: File | null;
  anti_ragging: File | null;
  student_undertaking: File | null;
  parents_undertaking: File | null;
  father_photo: File | null;
  mother_photo: File | null;
  status: string;
}

export const ADMISSION_CLG: AdmissionClgDTO = {
  id: 0,
  course_id: 0,
  course_name: '',
  admission_date: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })),//new Date(), 
  course_type_id: 0,
  course_type_name: '',
  entry_type: '',
  gender: '',
  first_name: '',
  last_name: '',
  user_name: '',
  father_name: '',
  mother_name: '',
  dob: null,
  category: '',
  address: '',
  district_id: 0,
  district_name: '',
  state_id: 0,
  state_name: '',
  country_id: 0,
  country_name: '',
  city_name: '',
  zip_code: '',
  corr_address: '',
  corr_district_id: 0,
  corr_district_name: '',
  corr_state_id: 0,
  corr_state_name: '',
  corr_country_id: 0,
  corr_country_name: '',
  corr_city_name: '',
  corr_zip_code: '',
  email: '',
  phone_no: '',
  religion: '',
  blood_group: '',
  medium: '',
  father_qualification: '',
  father_occupation: '',
  father_organisation: '',
  father_designation: '',
  father_phone_no: '',
  father_email: '',
  mother_qualification: '',
  mother_occupation: '',
  mother_organisation: '',
  mother_designation: '',
  mother_phone_no: '',
  mother_email: '',
  student_aadhaar_no: '',
  father_aadhaar_no: '',
  mother_aadhaar_no: '',
  samagra_id_no: '',
  staff_child: '',
  sibling_in_college: '',
  parents_ex_college: '',
  guardian_name: '',
  guardian_phone_no: '',
  undertaking: 'Yes',
  iii_language: '',
  transport_facility: '',
  transport_route: '',
  hostel_facility: '',
  hostel_occupancy: '',
  mess_facility: '',
  ii_language: '',
  stream: '',
  family_samagra_id: '',
  student_pen_no: '',
  high_school_board: '',
  high_school_year: '',
  high_school_roll_no: '',
  high_school_percentage: 0,
  intermediate_board: '',
  intermediate_year: '',
  intermediate_roll_no: '',
  intermediate_stream: '',
  intermediate_percentage: 0,
  diploma_college: '',
  diploma_university: '',
  diploma_registration_no: '',
  diploma_course_id: 0,
  diploma_course_name: '',
  diploma_passing_year: '',
  diploma_cgpa: 0,
  ug_college: '',
  ug_university: '',
  ug_registration_no: '',
  ug_course_id: 0,
  ug_course_name: '',
  ug_passing_year: '',
  ug_cgpa: 0,
  pg_college: '',
  pg_university: '',
  pg_registration_no: '',
  pg_course_id: 0,
  pg_course_name: '',
  pg_passing_year: '',
  pg_cgpa: 0,
  scholarship_student: '',
  photo: null,
  aadhaar_card: null,
  other_certificate: null,
  father_aadhaar: null,
  mother_aadhaar: null,
  samagra_id: null,
  transfer_certificate: null,
  high_school_marksheet: null,
  intermediate_marksheet: null,
  diploma_marksheet: null,
  ug_marksheet: null,
  pg_marksheet: null,
  anti_ragging: null,
  student_undertaking: null,
  parents_undertaking: null,
  father_photo: null,
  mother_photo: null,
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  created_at: new Date(),
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: '',
  modified_at: new Date(),
  status: ''
};
