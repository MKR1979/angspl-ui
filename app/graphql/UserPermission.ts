import gql from 'graphql-tag';
export const ADD_USER_PERMISSION = gql`
  mutation addUserPermission($user_id: Int!, $option_id: Int!, $grant: Boolean!) {
    addUserPermission(addUserPermissionInput: { user_id: $user_id, option_id: $option_id, grant: $grant })
  }
`;

export const UPDATE_USER_PERMISSION = gql`
  mutation updateUserPermission($id: Int!, $user_id: Int!, $option_id: Int!, $grant: Boolean!) {
    updateUserPermission(updateUserPermissionInput: { id: $id, user_id: $user_id, option_id: $option_id, grant: $grant })
  }
`;

export const DELETE_USER_PERMISSION = gql`
  mutation deleteUserPermission($ids: [Int]!) {
    deleteUserPermission(deleteUserPermissionInput: { ids: $ids })
  }
`;

export const USER_PERMISSION_LIST = gql`
  query getUserPermissionList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int, $user_id: Int, $module_id: Int) {
    getUserPermissionList(
      getUserPermissionListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        user_id: $user_id
        module_id: $module_id
      }
    ) {
      total_records
      user_permissions {
        id
        user_id
        user_name
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

export const GET_USER_PERMISSION = gql`
  query getUserPermission($id: Int!) {
    getUserPermission(getUserPermissionInput: { id: $id }) {
      id
      user_id
      user_name
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

export const GET_USER_PERMISSION_ALL = gql`
  query getUserPermissionAll($user_id: Int!) {
    getUserPermissionAll(user_id: $user_id) {
      userPermissions {
        option_id
        option_code
        option_name
        module_id
        module_name
        grant
        permission_source
      }
    }
  }
`;
