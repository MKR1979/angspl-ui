import BaseDTO from './BaseDTO';

export default interface TaxDTO extends BaseDTO {
  tax_description: string;
  tax_percentage: number;
}

export const TAX: TaxDTO = Object.freeze({
  id: 0,
  tax_description: '',
  tax_percentage: 0,
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
