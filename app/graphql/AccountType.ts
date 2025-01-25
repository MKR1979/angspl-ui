import gql from 'graphql-tag';
export const ADD_ACCOUNT_TYPE = gql`
  mutation addAccountType($account_type_name: String!) {
    addAccountType(addAccountTypeInput: { account_type_name: $account_type_name })
  }
`;

export const UPDATE_ACCOUNT_TYPE = gql`
  mutation updateAccountType($id: Int!, $account_type_name: String!) {
    updateAccountType(updateAccountTypeInput: { id: $id, account_type_name: $account_type_name })
  }
`;

export const DELETE_ACCOUNT_TYPE = gql`
  mutation deleteAccountType($ids: [Int]!) {
    deleteAccountType(deleteAccountTypeInput: { ids: $ids })
  }
`;

export const ACCOUNT_TYPE_LOOKUP = gql`
  query getAccountTypeLookup {
    getAccountTypeLookup {
      id
      text
    }
  }
`;

export const ACCOUNT_TYPE_LIST = gql`
  query getAccountTypeList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getAccountTypeList(
      getAccountTypeListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      accountTypes {
        id
        account_type_name
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

export const GET_ACCOUNT_TYPE = gql`
  query getAccountType($id: Int!) {
    getAccountType(getAccountTypeInput: { id: $id }) {
      id
      account_type_name
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

export const GET_ACCOUNT_TYPE_ACCOUNT_TYPE_NAME_EXIST = gql`
  query getAccountTypeAccountTypeNameExist($id: Int!, $account_type_name: String!) {
    getAccountTypeAccountTypeNameExist(id: $id, account_type_name: $account_type_name)
  }
`;
