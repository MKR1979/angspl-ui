import BaseDTO from './BaseDTO';

export default interface TargetDTO extends BaseDTO {
  first_name: string;
  last_name: string;
  job_title_name: string;
  department_name: string;
  account_name: string;
  office_phone_no: string;
  mobile_no: string;
  fax_no: string;
  website: string;
  email: string;
  description: string;
  assigned_to: number;
  assigned_to_user_name: string;
  referred_by: string;
  primary_address: string;
  primary_city_name: string;
  primary_state_id: number;
  primary_state_code: string;
  primary_state_name: string;
  primary_country_id: number;
  primary_country_name: string;
  primary_zip_code: string;
  other_address: string;
  other_city_name: string;
  other_state_id: number;
  other_state_code: string;
  other_state_name: string;
  other_country_id: number;
  other_country_name: string;
  other_zip_code: string;
}

export const TARGET: TargetDTO = Object.freeze({
  id: 0,
  first_name: '',
  last_name: '',
  job_title_name: '',
  department_name: '',
  account_name: '',
  office_phone_no: '',
  mobile_no: '',
  fax_no: '',
  website: '',
  email: '',
  description: '',
  assigned_to: 0,
  assigned_to_user_name: '',
  referred_by: '',
  primary_address: '',
  primary_city_name: '',
  primary_state_id: 0,
  primary_state_code: '',
  primary_state_name: '',
  primary_country_id: 0,
  primary_country_name: '',
  primary_zip_code: '',
  other_address: '',
  other_city_name: '',
  other_state_id: 0,
  other_state_code: '',
  other_state_name: '',
  other_country_id: 0,
  other_country_name: '',
  other_zip_code: '',
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
});
