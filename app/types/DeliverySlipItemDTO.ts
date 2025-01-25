import BaseDTO from './BaseDTO';

export default interface DeliverySlipItemDTO extends BaseDTO {
  item_no: number;
  product_id: number;
  product_name: string;
  part_number: string;
  qty: number;
  unit_id: number;
  unit_name: string;
  price: number;
  discount_type: string;
  discount: number;
  discount_amount: number;
  tax_id: number;
  tax_description: string;
  tax_amount: number;
  amount: number;
  lead_time: string;
  deleted: boolean;
}

export const DELIVERY_SLIP_ITEM: DeliverySlipItemDTO = Object.freeze({
  id: 0,
  item_no: 0,
  product_id: 0,
  product_name: '',
  part_number: '',
  qty: 0,
  unit_id: 0,
  unit_name: '',
  price: 0,
  discount_type: '',
  discount: 0,
  discount_amount: 0,
  tax_id: 0,
  tax_description: '',
  tax_amount: 0,
  amount: 0,
  lead_time: '',
  deleted: false,
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
