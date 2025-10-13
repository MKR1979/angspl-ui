import gql from 'graphql-tag';
export const ADD_MODULE = gql`
  mutation addModule($module_name: String!, $code: String, $status: String) {
    addModule(addModuleInput: { module_name: $module_name, code: $code, status: $status })
  }
`;

export const UPDATE_MODULE = gql`
  mutation updateModule($id: Int!, $module_name: String!, $code: String, $status: String) {
    updateModule(updateModuleInput: { id: $id, module_name: $module_name, code: $code, status: $status })
  }
`;

export const DELETE_MODULE = gql`
  mutation deleteModule($ids: [Int]!) {
    deleteModule(deleteModuleInput: { ids: $ids })
  }
`;

export const MODULE_LOOKUP = gql`
  query getModuleLookup {
    getModuleLookup {
      id
      text
    }
  }
`;

export const MODULE_LIST = gql`
  query getModuleList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getModuleList(
      getModuleListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      modules {
        id
        module_name
        code
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

export const GET_MODULE = gql`
  query getModule($id: Int!) {
    getModule(getModuleInput: { id: $id }) {
      id
      module_name
      code
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

export const GET_MODULE_NAME_EXIST = gql`
  query getModuleNameExist($id: Int!, $module_name: String!) {
    getModuleNameExist(id: $id, module_name: $module_name)
  }
`;
