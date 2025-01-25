export default interface CaseTypeDTO {
  id: number;
  case_type_name: string;
}

export const CASE_TYPE: CaseTypeDTO = Object.freeze({
  id: 0,
  case_type_name: ''
});
