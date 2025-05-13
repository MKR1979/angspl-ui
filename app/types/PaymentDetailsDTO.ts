import BaseDTO from './BaseDTO';

export default interface PaymentDetailsDTO extends BaseDTO {
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
}

export const PAYMENT_DETAILS: PaymentDetailsDTO = Object.freeze({
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  mobile_no: '',
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
