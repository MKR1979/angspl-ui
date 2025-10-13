import gql from 'graphql-tag';
export const ADD_COUNTRY = gql`
  mutation addCountry($country_name: String!, $status: String) {
    addCountry(addCountryInput: { country_name: $country_name, status: $status })
  }
`;

export const UPDATE_COUNTRY = gql`
  mutation updateCountry($id: Int!, $country_name: String!, $status: String) {
    updateCountry(updateCountryInput: { id: $id, country_name: $country_name, status: $status })
  }
`;

export const DELETE_COUNTRY = gql`
  mutation deleteCountry($ids: [Int]!) {
    deleteCountry(deleteCountryInput: { ids: $ids })
  }
`;

export const COUNTRY_LOOKUP = gql`
  query getCountryLookup {
    getCountryLookup {
      id
      text
    }
  }
`;

export const COUNTRY_LIST = gql`
  query getCountryList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getCountryList(
      getCountryListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      countries {
        id
        country_name
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

export const GET_COUNTRY = gql`
  query getCountry($id: Int!) {
    getCountry(getCountryInput: { id: $id }) {
      id
      country_name
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

export const GET_COUNTRY_COUNTRY_NAME_EXIST = gql`
  query getCountryCountryNameExist($id: Int!, $country_name: String!) {
    getCountryCountryNameExist(id: $id, country_name: $country_name)
  }
`;
