import BaseDTO from './BaseDTO';

export default interface ReceiptDTO extends BaseDTO {
  id: number;
  admission_date: string;
  course_id: number | null;
  course_name: string;
  learner_id: number | null;
  student_name: string;
  receipt_number: string;
  first_name: string;
  last_name: string;
  price: number;
  payment_date: Date;
  payment_mode: string;
  cheque_number: string;
  fee_head: string;
  fee_amount: number;
  remarks: string;
  status: string;
  from_date: Date;
  to_date: Date;
}

export const RECEIPT: ReceiptDTO = {
  id: 0,
  admission_date: '',
  course_id: null,
  course_name: '',
  learner_id: null,
  student_name: '',
  receipt_number: '',
  first_name: '',
  last_name: '',
  price: 0,
  payment_date: new Date(),
  payment_mode: '',
  cheque_number: '',
  fee_head: '',
  fee_amount: 0,
  remarks: '',
  status: '',
  from_date: new Date(),
  to_date: new Date(),
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
};
