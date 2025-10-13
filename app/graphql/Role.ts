import gql from 'graphql-tag';
export const ADD_ROLE = gql`
  mutation addRole($role_name: String!, $type_id: Int, $status: String) {
    addRole(addRoleInput: { role_name: $role_name, type_id: $type_id, status: $status })
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($id: Int!, $role_name: String!, $type_id: Int, $status: String) {
    updateRole(updateRoleInput: { id: $id, role_name: $role_name, type_id: $type_id, status: $status })
  }
`;

export const DELETE_ROLE = gql`
  mutation deleteRole($ids: [Int]!) {
    deleteRole(deleteRoleInput: { ids: $ids })
  }
`;

export const ROLE_LOOKUP = gql`
  query getRoleLookup($type_id : Int) {
    getRoleLookup(type_id : $type_id ) {
      id
      text
    }
  }
`;

export const ROLE_LIST = gql`
  query getRoleList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getRoleList(
      getRoleListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      roles {
        id
        role_name
        type_id
        type_name
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

export const GET_ROLE = gql`
  query getRole($id: Int!) {
    getRole(getRoleInput: { id: $id }) {
      id
      role_name
      type_id
      type_name
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

export const GET_ROLE_ROLE_NAME_EXIST = gql`
  query getRoleRoleNameExist($id: Int!, $role_name: String!) {
    getRoleRoleNameExist(id: $id, role_name: $role_name)
  }
`;
