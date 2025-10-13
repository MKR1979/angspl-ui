import BaseDTO from './BaseDTO';

export default interface AffiliateDTO extends BaseDTO {
  id: number;
  user_id: number | null;
  user_name: string;
  from_date: Date;
  to_date: Date;
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  password: string;
  address: string;
  city_name: string;
  district_id: number;
  district_name: string;
  state_id: number;
  state_name: string;
  country_id: number;
  country_name: string;
  zip_code: string;
  status: string;
  photo_id_url: string;
  role_id: number;
  conversion_rate: number;
  created_at: Date;
  total_referrals: number;
  total_earning: number;
  pending_payout: number;
  incentive_given: number;
  last_payment_date: Date;
  last_payment_amount: number;
}

export const AFFILIATE: AffiliateDTO = Object.freeze({
  id: 0,
  user_id: null,
  user_name: '',
  from_date: new Date(),
  to_date: new Date(),
  first_name: '',
  last_name: '',
  email: '',
  phone_no: '',
  password: '',
  address: '',
  city_name: '',
  district_id: 0,
  district_name: '',
  state_id: 0,
  state_name: '',
  country_id: 1,
  country_name: '',
  zip_code: '',
  status: '',
  photo_id_url: '',
  role_id: 0,
  conversion_rate: 0,
  created_at: new Date(),
  total_referrals: 0,
  total_earning: 0,
  pending_payout: 0,
  incentive_given: 0,
  last_payment_date: new Date(),
  last_payment_amount: 0,
  modified_at: new Date(),
  created_by: 0,
  created_by_first_name: '',
  created_by_last_name: '',
  created_by_user_name: '',
  modified_by: 0,
  modified_by_first_name: '',
  modified_by_last_name: '',
  modified_by_user_name: ''
});
