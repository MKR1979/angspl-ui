import gql from 'graphql-tag';
export const ADD_CASE_TYPE = gql`
  mutation addCaseType($case_type_name: String!) {
    addCaseType(addCaseTypeInput: { case_type_name: $case_type_name })
  }
`;

export const UPDATE_CASE_TYPE = gql`
  mutation updateCaseType($id: Int!, $case_type_name: String!) {
    updateCaseType(updateCaseTypeInput: { id: $id, case_type_name: $case_type_name })
  }
`;

export const DELETE_CASE_TYPE = gql`
  mutation deleteCaseType($ids: [Int]!) {
    deleteCaseType(deleteCaseTypeInput: { ids: $ids })
  }
`;

export const CASE_TYPE_LOOKUP = gql`
  query getCaseTypeLookup {
    getCaseTypeLookup {
      id
      text
    }
  }
`;

export const CASE_TYPE_LIST = gql`
  query getCaseTypeList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getCaseTypeList(
      getCaseTypeListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      caseTypes {
        id
        case_type_name
      }
    }
  }
`;

export const GET_CASE_TYPE = gql`
  query getCaseType($id: Int!) {
    getCaseType(getCaseTypeInput: { id: $id }) {
      id
      case_type_name
    }
  }
`;

export const GET_CASE_TYPE_CASE_TYPE_NAME_EXIST = gql`
  query getCaseTypeCaseTypeNameExist($id: Int!, $case_type_name: String!) {
    getCaseTypeCaseTypeNameExist(id: $id, case_type_name: $case_type_name)
  }
`;
