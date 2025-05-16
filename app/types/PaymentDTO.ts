import BaseDTO from './BaseDTO';
export default interface PaymentDTO extends BaseDTO {
  id: number;
  user_id: number;
  payee_name: string;
  amount: number;
  currency: string;
  receipt: string;
  payment_method: string;
  transaction_id: string;
  is_captured: boolean;
  status: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const PAYMENT: PaymentDTO = {
  id: 0,
  user_id: 0,
  payee_name: '',
  amount: 0,
  currency: '',
  receipt: '',
  payment_method: '',
  transaction_id: '',
  is_captured: false,
  status: '',
  razorpay_order_id: '',
  razorpay_payment_id: '',
  razorpay_signature: '',
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
};
