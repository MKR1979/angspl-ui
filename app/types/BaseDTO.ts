export default interface BaseDTO {
  id: number;
  created_by: number;
  created_by_first_name: string;
  created_by_last_name: string;
  created_by_user_name: string;
  created_at: Date;
  modified_by: number;
  modified_by_first_name: string;
  modified_by_last_name: string;
  modified_by_user_name: string;
  modified_at: Date;
}
