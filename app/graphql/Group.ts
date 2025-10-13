import gql from 'graphql-tag';
export const ADD_GROUP = gql`
  mutation addGroup($group_name: String!, $status: String) {
    addGroup(addGroupInput: { group_name: $group_name, status: $status })
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup($id: Int!, $group_name: String!, $status: String) {
    updateGroup(updateGroupInput: { id: $id, group_name: $group_name, status: $status })
  }
`;

export const DELETE_GROUP = gql`
  mutation deleteGroup($ids: [Int]!) {
    deleteGroup(deleteGroupInput: { ids: $ids })
  }
`;

export const GROUP_LOOKUP = gql`
  query getGroupLookup {
    getGroupLookup {
      id
      text
    }
  }
`;

export const GROUP_LIST = gql`
  query getGroupList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getGroupList(
      getGroupListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      groups {
        id
        group_name
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

export const GET_GROUP = gql`
  query getGroup($id: Int!) {
    getGroup(getGroupInput: { id: $id }) {
      id
      group_name
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

export const GET_GROUP_NAME_EXIST = gql`
  query getGroupNameExist($id: Int!, $group_name: String!) {
    getGroupNameExist(id: $id, group_name: $group_name)
  }
`;
