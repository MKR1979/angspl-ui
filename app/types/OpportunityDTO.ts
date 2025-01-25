import BaseDTO from './BaseDTO';

export default interface OpportunityDTO extends BaseDTO {
  opportunity_name: string;
  account_id: number;
  account_name: string;
  currency_id: number;
  currency_name: string;
  amount: number;
  expected_close_date: Date;
  stage_id: number;
  stage_name: string;
  opportunity_type_id: number;
  opportunity_type_name: string;
  probability: number;
  lead_source_id: number;
  lead_source_name: string;
  next_step: string;
  description: string;
  assigned_to: number;
  assigned_to_user_name: string;
}

export const OPPORTUNITY: OpportunityDTO = Object.freeze({
  id: 0,
  opportunity_name: '',
  account_id: 0,
  account_name: '',
  currency_id: 0,
  currency_name: '',
  amount: 0,
  expected_close_date: new Date(1899, 11, 31),
  stage_id: 0,
  stage_name: '',
  opportunity_type_id: 0,
  opportunity_type_name: '',
  probability: 0,
  lead_source_id: 0,
  lead_source_name: '',
  next_step: '',
  description: '',
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
