import BaseDTO from './BaseDTO';

export default interface ProductDTO extends BaseDTO {
  product_name: string;
  part_number: string;
  unit_id: number;
  unit_code: string;
  unit_name: string;
  product_category_id: number;
  product_category_name: string;
  product_type: string;
  currency_id: number;
  currency_name: string;
  currency_symbol: string;
  cost: number;
  contact: string;
  url: string;
  description: string;
  product_image: string;
}

export const PRODUCT: ProductDTO = Object.freeze({
  id: 0,
  product_name: '',
  part_number: '',
  unit_id: 0,
  unit_code: '',
  unit_name: '',
  product_category_id: 0,
  product_category_name: '',
  product_type: '',
  currency_id: 0,
  currency_name: '',
  currency_symbol: '',
  cost: 0,
  contact: '',
  url: '',
  description: '',
  product_image: '',
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
