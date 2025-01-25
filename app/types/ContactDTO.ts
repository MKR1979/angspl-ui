import BaseDTO from './BaseDTO';

export default interface ContactDTO extends BaseDTO {
  first_name: string;
  last_name: string;
  office_phone_no: string;
  mobile_no: string;
  job_title_name: string;
  department_name: string;
  account_id: number;
  account_name: string;
  fax_no: string;
  email: string;
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
  description: string;
  assigned_to: number;
  assigned_to_user_name: string;
  lead_source_id: number;
  lead_source_name: string;
  reports_to: number;
  reports_to_name: string;
}

export const CONTACT: ContactDTO = Object.freeze({
  id: 0,
  first_name: '',
  last_name: '',
  office_phone_no: '',
  mobile_no: '',
  job_title_name: '',
  department_name: '',
  account_id: 0,
  account_name: '',
  fax_no: '',
  email: '',
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
  description: '',
  assigned_to: 0,
  assigned_to_user_name: '',
  lead_source_id: 0,
  lead_source_name: '',
  reports_to: 0,
  reports_to_name: '',
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
