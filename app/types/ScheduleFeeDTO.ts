import BaseDTO from './BaseDTO';
import LookupDTO from './LookupDTO';

export default interface ScheduleFeeDTO extends BaseDTO {
  id: number;
  learner_id: number | null;
  user_name: string;
  user_id: number;
  from_date: Date;
  to_date: Date;
  payment_id: number;
  admission_id: number;
  student_name: string;
  receipt_number: string;
  course_id: number | null;
  course_name: string;
  status: string;
  start_date: string;
  total_amount: number;
  net_amount: number;
  payment_frequency: string;
  fee_frequency: string;
  fee_month: number;
  fee_cycle_code: string;
  fee_year: number;
  base_course_price: number;
  fee_amount: number;
  is_paid: boolean;
  payment_date: Date;
  due_date: Date;
  discount: number;
  fine_amount: number;
  transaction_id: number;
  courseLookupDTO: LookupDTO | null;
  userLookupDTO: LookupDTO | null;
}

export const SCHEDULE_FEE: ScheduleFeeDTO = Object.freeze({
  id: 0,
  learner_id: null,
  user_name: '',
  user_id: 0,
  status: '',
  from_date: new Date(),
  to_date: new Date(),
  payment_id: 0,
  admission_id: 0,
  student_name: '',
  receipt_number: '',
  course_id: null,
  course_name: '',
  start_date: '',
  total_amount: 0,
  net_amount: 0,
  payment_frequency: '',
  fee_frequency: '',
  fee_month: 0,
  fee_cycle_code: '',
  fee_year: 0,
  base_course_price: 0,
  fee_amount: 0,
  is_paid: false,
  payment_date: new Date(),
  due_date: new Date(),
  discount: 0,
  fine_amount: 0,
  transaction_id: 0,
  courseLookupDTO: { id: 0, text: '' },
  userLookupDTO: { id: 0, text: '' },
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
