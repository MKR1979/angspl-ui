import BaseDTO from './BaseDTO';

export default interface AdmissionTechDTO extends BaseDTO {
  id: number;
  course_id: number;
  course_name: string;
  admission_date: Date;
  first_name: string;
  last_name: string;
  dob: Date | null;
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
  samagra_id: string;
  pen_no: string;
  father_name: string;
  father_occupation: string;
  father_phone_no: string;
  mother_name: string;
  mother_occupation: string;
  mother_phone_no: string;
  highschoolname: string;
  highschoolpercentage: number;
  highersschoolname: string;
  highersschoolpercentage: number;
  graduationname: string;
  graduationpercentage: number;
  undertaking: string;
  tenthproof: File | null;
  twelthproof: File | null;
  graduationproof: File | null;
  photoidproof: File | null;
  photo: File | null;
  is_aadhar_req: File | null;
  is_birth_certi_req: File | null;
  is_tc_req: File | null;
  is_samagraid_req: File | null;
  status: string;
  paid_amount: number;
  total_fee: number;
  payment_mode: string;
  from_date: Date;
  to_date: Date;
}


export const ADMISSION_TECH: AdmissionTechDTO = {
  id: 0,
  course_id: 0,
  course_name: '',
  admission_date: new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })),//new Date(), 
  first_name: '',
  last_name: '',
  dob: null,
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
  samagra_id: '',
  pen_no: '',
  father_name: '',
  father_occupation: '',
  father_phone_no: '',
  mother_name: '',
  mother_occupation: '',
  mother_phone_no: '',
  highschoolname: '',
  highschoolpercentage: 0,
  highersschoolname: '',
  highersschoolpercentage: 0,
  graduationname: '',
  graduationpercentage: 0,
  undertaking: 'Yes',
  tenthproof: null,
  twelthproof: null,
  graduationproof: null,
  photoidproof: null,
  photo: null,
  is_aadhar_req: null,
  is_birth_certi_req: null,
  is_tc_req: null,
  is_samagraid_req: null,
  status: '',
  paid_amount: 0,
  total_fee: 0,
  payment_mode: '',
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
  modified_at: new Date(),
};
