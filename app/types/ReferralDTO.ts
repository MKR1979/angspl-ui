import BaseDTO from './BaseDTO';

export interface ReferralStatusHistoryDTO {
  old_status: string;
  new_status: string;
  created_at: Date;
}

export default interface ReferralDTO extends BaseDTO {
  id: number;
  user_id: number | null;
  user_name: string;
  from_date: Date;
  to_date: Date;
  referral_company_name: string;
  referral_date: Date;
  contact_person: string;
  mobile_no: string;
  email: string;
  address: string;
  product_interest: string;
  requirement: string;
  is_paid: boolean;
  status: string;
  referred_by: number;
  referred_by_name: string;
  received_amount: number;
  status_history: ReferralStatusHistoryDTO[];
}

export const REFERRAL: ReferralDTO = {
  id: 0,
  user_id: null,
  user_name: '',
  from_date: new Date(),
  to_date: new Date(),
  referral_company_name: '',
  referral_date: new Date(),
  contact_person: '',
  mobile_no: '',
  email: '',
  address: '',
  product_interest: '',
  requirement: '',
  is_paid: false,
  status: '',
  referred_by: 0,
  referred_by_name: '',
  received_amount: 0,
  status_history: [],
  created_at: new Date(),
  modified_at: new Date(),
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: ''
};
