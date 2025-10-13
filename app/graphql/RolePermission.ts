import gql from 'graphql-tag';
export const ADD_ROLE_PERMISSION = gql`
  mutation addRolePermission($role_id: Int!, $option_id: Int!, $grant: Boolean!) {
    addRolePermission(addRolePermissionInput: { role_id: $role_id, option_id: $option_id, grant: $grant })
  }
`;

export const UPDATE_ROLE_PERMISSION = gql`
  mutation updateRolePermission($id: Int!, $role_id: Int!, $option_id: Int!, $grant: Boolean!) {
    updateRolePermission(updateRolePermissionInput: { id: $id, role_id: $role_id, option_id: $option_id, grant: $grant })
  }
`;

export const ADD_OR_UPDATE_ROLE_PERMISSION = gql`
  mutation addOrUpdateRolePermission($id: Int!, $role_id: Int!, $option_id: Int!, $grant: Boolean!) {
    addOrUpdateRolePermission(updateRolePermissionInput: { id: $id, role_id: $role_id, option_id: $option_id, grant: $grant })
  }
`;

export const ADD_ROLE_PERMISSION_ALL = gql`
  mutation addRolePermissionAll($role_id: Int!, $module_id: Int, $grant: Boolean!) {
    addRolePermissionAll(role_id: $role_id, module_id: $module_id, grant: $grant)
  }
`;

export const DELETE_ROLE_PERMISSION = gql`
  mutation deleteRolePermission($ids: [Int]!) {
    deleteRolePermission(deleteRolePermissionInput: { ids: $ids })
  }
`;

export const ROLE_PERMISSION_LIST = gql`
  query getRolePermissionList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getRolePermissionList(
      getRolePermissionListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      role_permissions {
        id
        role_id
        role_name
        module_id
        module_name
        option_id
        option_name
        grant
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

export const GET_ROLE_PERMISSION = gql`
  query getRolePermission($id: Int!) {
    getRolePermission(getRolePermissionInput: { id: $id }) {
      id
      role_id
      role_name
      module_id
      module_name
      option_id
      option_name
      grant
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

export const GET_ROLE_PERMISSION_ALL = gql`
  query GetRolePermissionAll($role_id: Int, $module_id: Int) {
    getRolePermissionAll(role_id: $role_id, module_id: $module_id) {
      rolePermissions {
        id
        role_id
        role_name
        module_id
        module_name
        option_id
        option_name
        grant
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
