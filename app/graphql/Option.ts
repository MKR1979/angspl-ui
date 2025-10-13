import gql from 'graphql-tag';
export const ADD_OPTION = gql`
  mutation addOption($option_code: Int, $option_name: String!, $module_id: Int,$status: String) {
    addOption(addOptionInput: { option_code: $option_code, option_name: $option_name, module_id: $module_id,status: $status })
  }
`;

export const UPDATE_OPTION = gql`
  mutation updateOption($id: Int!, $option_code: Int, $option_name: String!, $module_id: Int,$status: String) {
    updateOption(updateOptionInput: { id: $id, option_code: $option_code, option_name: $option_name, module_id: $module_id 
    ,status: $status})
  }
`;

export const DELETE_OPTION = gql`
  mutation deleteOption($ids: [Int]!) {
    deleteOption(deleteOptionInput: { ids: $ids })
  }
`;

export const OPTION_LOOKUP = gql`
  query getOptionLookup($module_id: Int!) {
    getOptionLookup(module_id: $module_id ) {
      id
      text
    }
  }
`;

export const OPTION_LIST = gql`
  query getOptionList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getOptionList(
      getOptionListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      options {
        id
        option_code
        option_name
        module_id
        module_name
        status
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

export const GET_OPTION = gql`
  query getOption($id: Int!) {
    getOption(getOptionInput: { id: $id }) {
      id
      option_code
      option_name
      module_id
      module_name
      status
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

export const GET_OPTION_CODE_EXIST = gql`
  query getOptionCodeExist($id: Int!, $option_code: Int!) {
    getOptionCodeExist(id: $id, option_code: $option_code)
  }
`;
