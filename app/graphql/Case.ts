import gql from 'graphql-tag';
export const ADD_CASE = gql`
  mutation addCase(
    $case_number: String
    $case_description: String
    $account_id: Int
    $priority: String
    $state: String
    $status: String
    $subject: String
    $resolution: String
    $case_type_id: Int
    $assigned_to: Int
  ) {
    addCase(
      addCaseInput: {
        case_number: $case_number
        case_description: $case_description
        account_id: $account_id
        priority: $priority
        state: $state
        status: $status
        subject: $subject
        resolution: $resolution
        case_type_id: $case_type_id
        assigned_to: $assigned_to
      }
    )
  }
`;

export const UPDATE_CASE = gql`
  mutation updateCase(
    $id: Int!
    $case_number: String
    $case_description: String
    $account_id: Int
    $priority: String
    $state: String
    $status: String
    $case_type_id: Int
    $subject: String
    $resolution: String
    $assigned_to: Int
  ) {
    updateCase(
      updateCaseInput: {
        id: $id
        case_number: $case_number
        case_description: $case_description
        account_id: $account_id
        priority: $priority
        state: $state
        status: $status
        case_type_id: $case_type_id
        subject: $subject
        resolution: $resolution
        assigned_to: $assigned_to
      }
    )
  }
`;

export const DELETE_CASE = gql`
  mutation deleteCase($ids: [Int]!) {
    deleteCase(deleteCaseInput: { ids: $ids })
  }
`;

export const CASE_LOOKUP = gql`
  query getCaseLookup {
    getCaseLookup {
      id
      text
    }
  }
`;

export const CASE_LIST = gql`
  query getCaseList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getCaseList(
      getCaseListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      cases {
        id
        case_number
        case_description
        account_id
        account_name
        priority
        state
        status
        case_type_id
        case_type_name
        subject
        resolution
        assigned_to
        assigned_to_user_name
        created_by
        created_by_first_name
        created_by_last_name
        created_by_user_name
        created_at
        modified_by
        modified_by_first_name
        modified_by_last_name
        modified_by_user_name
        modified_at
      }
    }
  }
`;

export const GET_CASE = gql`
  query getCase($id: Int!) {
    getCase(getCaseInput: { id: $id }) {
      id
      case_number
      case_description
      account_id
      account_name
      priority
      state
      status
      case_type_id
      case_type_name
      subject
      resolution
      assigned_to
      assigned_to_user_name
      created_by
      created_by_first_name
      created_by_last_name
      created_by_user_name
      created_at
      modified_by
      modified_by_first_name
      modified_by_last_name
      modified_by_user_name
      modified_at
    }
  }
`;
