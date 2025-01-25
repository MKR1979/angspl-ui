import gql from 'graphql-tag';
export const ADD_STATE = gql`
  mutation addState($state_name: String!, $state_code: String, $country_id: Int) {
    addState(addStateInput: { state_name: $state_name, state_code: $state_code, country_id: $country_id })
  }
`;

export const UPDATE_STATE = gql`
  mutation updateState($id: Int!, $state_name: String!, $state_code: String, $country_id: Int) {
    updateState(updateStateInput: { id: $id, state_name: $state_name, state_code: $state_code, country_id: $country_id })
  }
`;

export const DELETE_STATE = gql`
  mutation deleteState($ids: [Int]!) {
    deleteState(deleteStateInput: { ids: $ids })
  }
`;

export const STATE_LOOKUP = gql`
  query getStateLookup($country_id: Int!) {
    getStateLookup(country_id: $country_id) {
      id
      text
    }
  }
`;

export const STATE_LIST = gql`
  query getStateList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getStateList(
      getStateListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      states {
        id
        state_name
        state_code
        country_id
        country_name
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

export const STATE_SHORTLIST = gql`
  query getStateList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getStateList(
      getStateListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      states {
        id
        state_name
        state_code
      }
    }
  }
`;
export const GET_STATE = gql`
  query getState($id: Int!) {
    getState(getStateInput: { id: $id }) {
      id
      state_name
      state_code
      country_id
      country_name
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
