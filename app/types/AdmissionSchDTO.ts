import BaseDTO from './BaseDTO';

export default interface AdmissionSchoolDTO extends BaseDTO {
  id: number;
  course_id: number;
  course_name: string;
  admission_date: Date;
  gender: string;
  first_name: string;
  last_name: string;
  father_name: string;
  mother_name: string;
  dob: Date | null;
  category: string;
  address: string;
  state_id: number;
  state_name: string;
  country_id: number;
  country_name: string;
  city_name: string;
  zip_code: string;
  email: string;
  phone_no: string;
  religion: string;
  blood_group: string;
  boarder_day_scholar: string;
  current_school: string;
  current_board: string;
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
  sibling_in_school: string;
  parents_ex_school: string;
  guardian_name: string;
  guardian_phone_no: string;
  undertaking: string;
  iii_language: string;
  transport_facility: string;
  transport_route: string;
  mess_facility: string;
  ii_language: string;
  stream: string;
  family_samagra_id: string;
  student_pen_no: string;
  photo: File | null;
  aadhaar_card: File | null;
  birth_certificate: File | null;
  other_certificate: File | null;
  father_aadhaar: File | null;
  mother_aadhaar: File | null;
  samagra_id: File | null;
  transfer_certificate: File | null;
  prev_class_marksheet: File | null;
  father_photo: File | null;
  mother_photo: File | null;
  status: string;
}

export const ADMISSION_SCHOOL: AdmissionSchoolDTO = {
  id: 0,
  course_id: 0,
  course_name: '',
  admission_date: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })),//new Date(), 
  gender: '',
  first_name: '',
  last_name: '',
  father_name: '',
  mother_name: '',
  dob: null,
  category: '',
  address: '',
  state_id: 0,
  state_name: '',
  country_id: 0,
  country_name: '',
  city_name: '',
  zip_code: '',
  email: '',
  phone_no: '',
  religion: '',
  blood_group: '',
  boarder_day_scholar: '',
  current_school: '',
  current_board: '',
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
  sibling_in_school: '',
  parents_ex_school: '',
  guardian_name: '',
  guardian_phone_no: '',
  undertaking: 'Yes',
  iii_language: '',
  transport_facility: '',
  transport_route: '',
  mess_facility: '',
  ii_language: '',
  stream: '',
  family_samagra_id: '',
  student_pen_no: '',
  photo: null,
  aadhaar_card: null,
  birth_certificate: null,
  other_certificate: null,
  father_aadhaar: null,
  mother_aadhaar: null,
  samagra_id: null,
  transfer_certificate: null,
  prev_class_marksheet: null,
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
