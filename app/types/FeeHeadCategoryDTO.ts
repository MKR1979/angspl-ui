import BaseDTO from './BaseDTO';
export default interface FeeHeaCategorydDTO extends BaseDTO {
  id: number;
  name: string;
  category: string;
  status: string;
}

export const FEE_HEAD_CATEGORY: FeeHeaCategorydDTO = Object.freeze({
  id: 0,
  name: '',
  category: '',
  status: '',
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
