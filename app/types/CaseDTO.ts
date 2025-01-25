import BaseDTO from './BaseDTO';

export default interface CaseDTO extends BaseDTO {
  case_number: string;
  case_description: string;
  account_id: number;
  account_name: string;
  priority: string;
  state: string;
  status: string;
  case_type_id: number;
  subject: string;
  resolution: string;
  case_type_name: string;
  assigned_to: number;
  assigned_to_user_name: string;
}

export const CASE: CaseDTO = Object.freeze({
  id: 0,
  case_number: '',
  case_description: '',
  account_id: 0,
  account_name: '',
  priority: '',
  state: '',
  status: '',
  case_type_id: 0,
  case_type_name: '',
  subject: '',
  resolution: '',
  assigned_to: 0,
  assigned_to_user_name: '',
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
