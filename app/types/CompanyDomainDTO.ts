import BaseDTO from './BaseDTO';
export default interface CompanyDomainDTO extends BaseDTO {
  id: number;
  company_id: number;
  domain_name: string;
  company_name: string;
  logo_url: string;
  logo_height: number;
  logo_width: number;
  status: string;
}

export const COMPANY_DOMAIN: CompanyDomainDTO = Object.freeze({
  id: 0,
  company_id: 0,
  domain_name: '',
  company_name: '',
  logo_url: '',
  logo_height: 0,
  logo_width: 0,
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
});
