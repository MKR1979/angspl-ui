import BaseDTO from './BaseDTO';

export default interface AdmissionDTO extends BaseDTO {
  id: number;
  course_id: number;
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
  highschoolname: string;
  highschoolpercentage: number;
  highersschoolname: string;
  highersschoolpercentage: number;
  graduationname: string;
  graduationpercentage: number;
  tenthproof: File | null;
  twelthproof: File | null;
  graduationproof: File | null;
  photoidproof: File | null;
  photo: File | null;
  status: string;
}


export const ADMISSION: AdmissionDTO = {
  id: 0,
  course_id: 0,
  course_name: '',
  admission_date: new Date(1899, 11, 31), 
  first_name: '',
  last_name: '',
  dob: new Date(1899, 11, 31),
  gender: '',
  email: '',
  phone_no: '',
  address: '',
  city_name: '',
  state_id: 0,
  state_name: '',
  country_id: 1,
  country_name: '',
  zip_code: '',
  highschoolname: '',
  highschoolpercentage: 0,
  highersschoolname: '',
  highersschoolpercentage: 0,
  graduationname: '',
  graduationpercentage: 0,
  tenthproof: null,
  twelthproof:null,
  graduationproof:null,
  photoidproof:null,
  photo:null,
  status: '',
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  created_at: new Date(1899, 11, 31),
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: '',
  modified_at: new Date(1899, 11, 31),
};
