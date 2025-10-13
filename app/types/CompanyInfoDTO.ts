import BaseDTO from './BaseDTO';
export default interface CompanyInfoDTO extends BaseDTO {
   id:  number;
   company_id:  number;
   domain_name: string; 
   company_name: string; 
   company_email:string;
   company_phone_no:string;
   company_address: string;
   logo_url: string;
   logo_height: number;
   logo_width: number;
   status: string;
}


export const COMPANY_INFO: CompanyInfoDTO = Object.freeze({
  id: 0,
  company_id: 0,
  domain_name: '',
  company_name: '',
  company_email: '',
  company_phone_no: '',
  company_address: '',
  logo_url: '',
  logo_height: 0,
  logo_width: 0,
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
