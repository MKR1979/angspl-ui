import BaseDTO from './BaseDTO';

export default interface AccountDTO extends BaseDTO {
  account_name: string;
  website: string;
  email: string;
  phone_no: string;
  fax_no: string;
  billing_address: string;
  billing_city_name: string;
  billing_state_id: number;
  billing_state_code: string;
  billing_state_name: string;
  billing_country_id: number;
  billing_country_name: string;
  billing_zip_code: string;
  shipping_address: string;
  shipping_city_name: string;
  shipping_state_id: number;
  shipping_state_code: string;
  shipping_state_name: string;
  shipping_country_id: number;
  shipping_country_name: string;
  shipping_zip_code: string;
  description: string;
  assigned_to: number;
  assigned_to_first_name: string;
  assigned_to_last_name: string;
  assigned_to_user_name: string;
  account_type_id: number;
  account_type_name: string;
  industry_id: number;
  industry_name: string;
  annual_revenue: number;
  head_count: number;
}

export const ACCOUNT: AccountDTO = Object.freeze({
  id: 0,
  account_name: '',
  website: '',
  email: '',
  phone_no: '',
  fax_no: '',
  billing_address: '',
  billing_city_name: '',
  billing_state_id: 0,
  billing_state_code: '',
  billing_state_name: '',
  billing_country_id: 0,
  billing_country_name: '',
  billing_zip_code: '',
  shipping_address: '',
  shipping_city_name: '',
  shipping_state_id: 0,
  shipping_state_code: '',
  shipping_state_name: '',
  shipping_country_id: 0,
  shipping_country_name: '',
  shipping_zip_code: '',
  description: '',
  assigned_to: 0,
  assigned_to_first_name: '',
  assigned_to_last_name: '',
  assigned_to_user_name: '',
  account_type_id: 0,
  account_type_name: '',
  industry_id: 0,
  industry_name: '',
  annual_revenue: 0,
  head_count: 0,
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
