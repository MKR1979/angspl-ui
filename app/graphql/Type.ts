import gql from 'graphql-tag';
export const ADD_TYPE = gql`
  mutation addType($type_name: String!, $status: String) {
    addType(addTypeInput: { type_name: $type_name, status: $status })
  }
`;

export const UPDATE_TYPE = gql`
  mutation updateType($id: Int!, $type_name: String!, $status: String) {
    updateType(updateTypeInput: { id: $id, type_name: $type_name, status: $status })
  }
`;

export const DELETE_TYPE = gql`
  mutation deleteType($ids: [Int]!) {
    deleteType(deleteTypeInput: { ids: $ids })
  }
`;

export const TYPE_LOOKUP = gql`
  query getTypeLookup {
    getTypeLookup {
      id
      text
    }
  }
`;

export const TYPE_LIST = gql`
  query getTypeList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getTypeList(
      getTypeListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      types {
        id
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

export const GET_TYPE = gql`
  query getType($id: Int!) {
    getType(getTypeInput: { id: $id }) {
      id
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

export const GET_TYPE_NAME_EXIST = gql`
  query getTypeNameExist($id: Int!, $type_name: String!) {
    getTypeNameExist(id: $id, type_name: $type_name)
  }
`;
