import BaseDTO from './BaseDTO';

export default interface EnrollmentDTO extends BaseDTO {
  user_id: number;
  user_name: string;
  course_id: number;
  course_name: string;
  enrollment_date: Date;
  end_date: Date;
  paid_amount: number;
  status: string;
  currency_symbol: string;
}

export const ENROLLMENT: EnrollmentDTO = Object.freeze({
  id: 0,
  user_id: 0,
  user_name: '',
  course_id: 0,
  course_name: '',
  enrollment_date: new Date(),
  end_date: new Date(),
  paid_amount: 0,
  status:'Active',
  currency_symbol: '',
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
