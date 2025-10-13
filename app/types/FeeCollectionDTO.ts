import BaseDTO from './BaseDTO';

export default interface FeeCollectionDTO extends BaseDTO {
  id: number;
  course_id: number | null;
  course_name: string;
  learner_id: number | null;
  student_name: string;
  payment_date: Date;
  payment_mode: string;
  cheque_number: string;
  fee_head_id: number;
  fee_head: string;
  fee_amount: number;
  fee_month: string;
  fee_year: string;
  remarks: string;
  status: string;
  from_date: Date;
  to_date: Date;
  currency: string;
  transaction_id: string;
  is_captured: boolean;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  source_flag: string;
}

export const FEE_COLLECTION: FeeCollectionDTO = Object.freeze({
  id: 0,
  course_id: null,
  course_name: '',
  learner_id: null,
  student_name: '',
  payment_date: new Date(),
  payment_mode: '',
  cheque_number: '',
  fee_head_id: 0,
  fee_head: '',
  fee_amount: 0,
  fee_month: '',
  fee_year: '',
  remarks: '',
  status: '',
  from_date: new Date(),
  to_date: new Date(),
  currency: '',
  transaction_id: '',
  is_captured: false,
  razorpay_order_id: '',
  razorpay_payment_id: '',
  razorpay_signature: '',
  source_flag: '',
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
