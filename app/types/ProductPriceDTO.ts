import BaseDTO from './BaseDTO';

export default interface ProductPriceDTO extends BaseDTO {
  product_id: number;
  product_name: string;
  part_number: string;
  currency_id: number;
  currency_name: string;
  currency_symbol: string;
  unit_price: number;
}

export const PRODUCT_PRICE: ProductPriceDTO = Object.freeze({
  id: 0,
  product_id: 0,
  product_name: '',
  part_number: '',
  currency_id: 0,
  currency_name: '',
  currency_symbol: '',
  unit_price: 0,
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
