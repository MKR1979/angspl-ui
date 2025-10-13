import BaseDTO from './BaseDTO';
export default interface CompanyDTO extends BaseDTO {
  id: number;
  company_code: string;
  company_name: string;
  domain_prefix: string;
  domain_name: string;
  company_type: string;
  email: string;
  phone_no: string;
  address: string;
  logo_url: string;
  logo_height: number;
  logo_width: number;
  plan_type: string;
  payment_type: string;
  amount: number;
  source_flag: string;
  status: string;
}

export const COMPANY: CompanyDTO = Object.freeze({
  id: 0,
  company_code: '',
  company_name: '',
  domain_prefix: '',
  domain_name: '',
  company_type: '',
  email: '',
  phone_no: '',
  address: '',
  logo_url: '',
  logo_height: 0,
  logo_width: 0,
  plan_type: '',
  payment_type: '',
  amount: 0,
  source_flag: '',
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
  modified_at: new Date(1899, 11, 31)
});
