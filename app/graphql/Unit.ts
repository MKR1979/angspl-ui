import gql from 'graphql-tag';
export const ADD_UNIT = gql`
  mutation addUnit($unit_code: String, $unit_name: String) {
    addUnit(addUnitInput: { unit_code: $unit_code, unit_name: $unit_name })
  }
`;

export const UPDATE_UNIT = gql`
  mutation updateUnit($id: Int!, $unit_code: String, $unit_name: String) {
    updateUnit(updateUnitInput: { id: $id, unit_code: $unit_code, unit_name: $unit_name })
  }
`;

export const DELETE_UNIT = gql`
  mutation deleteUnit($ids: [Int]!) {
    deleteUnit(deleteUnitInput: { ids: $ids })
  }
`;

export const UNIT_LOOKUP = gql`
  query getUnitLookup {
    getUnitLookup {
      id
      text
    }
  }
`;

export const UNIT_LIST = gql`
  query getUnitList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getUnitList(
      getUnitListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      units {
        id
        unit_code
        unit_name
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

export const GET_UNIT = gql`
  query getUnit($id: Int!) {
    getUnit(getUnitInput: { id: $id }) {
      id
      unit_code
      unit_name
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

export const GET_UNIT_UNIT_CODE_EXIST = gql`
  query getUnitUnitCodeExist($id: Int!, $unit_code: String!) {
    getUnitUnitCodeExist(id: $id, unit_code: $unit_code)
  }
`;

export const GET_UNIT_UNIT_NAME_EXIST = gql`
  query getUnitUnitNameExist($id: Int!, $unit_name: String!) {
    getUnitUnitNameExist(id: $id, unit_name: $unit_name)
  }
`;
