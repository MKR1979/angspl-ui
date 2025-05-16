import BaseDTO from './BaseDTO';
export default interface PaidCourseDTO extends BaseDTO {
  id: number; 
  Course_Name:  string;
  Course_Code:  string;
  Duration:  string;
  Price:  number; 
  Content:  string;
  Notes:  string;
  Sample_Questions:  string;
  Exam_Quiz:  string;
  PDF_Resources:  string;
  Sample_Questions_File:  string;
}

export const PAID_COURSE: PaidCourseDTO = {
  id: 0,
  Course_Name: '',
  Course_Code: '',
  Duration: '',
  Price: 0,
  Content: '',
  Notes: '',
  Sample_Questions: '',
  Exam_Quiz: '',
  PDF_Resources: '',
  Sample_Questions_File: '',
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
};
