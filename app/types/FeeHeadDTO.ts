import BaseDTO from './BaseDTO';
export default interface FeeHeadDTO extends BaseDTO {
  id: number;
  fee_head_category_id: number;
  category_name: string;
  name: string;
  code: string;
  base_amount: number;
  description: string;
  is_mandatory: boolean;
  status: string;
}

export const FEE_HEAD: FeeHeadDTO = Object.freeze({
  id: 0,
  fee_head_category_id: 0,
  category_name: '',
  name: '',
  code: '',
  description: '',
  status: '',
  is_mandatory: false,
  base_amount: 0,
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
