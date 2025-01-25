import BaseDTO from './BaseDTO';

export default interface DocumentDTO extends BaseDTO {
  document_name: string;
  revision: number;
  document_type_id: number;
  document_type_name: string;
  is_template: boolean;
  publish_date: Date;
  expiration_date: Date;
  document_category_id: number;
  document_category_name: string;
  document_subcategory_id: number;
  document_subcategory_name: string;
  description: string;
  related_document_id: number;
  related_document_name: string;
  related_document_revision: number;
  assigned_to: number;
  assigned_to_user_name: string;
  file_name: string;
  status: string;
}

export const DOCUMENT: DocumentDTO = Object.freeze({
  id: 0,
  document_name: '',
  revision: 0,
  document_type_id: 0,
  document_type_name: '',
  is_template: false,
  publish_date: new Date(1899, 11, 31),
  expiration_date: new Date(1899, 11, 31),
  document_category_id: 0,
  document_category_name: '',
  document_subcategory_id: 0,
  document_subcategory_name: '',
  description: '',
  related_document_id: 0,
  related_document_name: '',
  related_document_revision: 0,
  assigned_to: 0,
  assigned_to_user_name: '',
  file_name: '',
  status: '',
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
