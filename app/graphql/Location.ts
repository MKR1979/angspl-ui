import gql from 'graphql-tag';
export const ADD_LOCATION = gql`
  mutation addLocation(
    $location_name: String
    $description: String
    $capacity: Int
    $address: String
    $city_name: String
    $state_id: Int
    $country_id: Int
    $zip_code: String
  ) {
    addLocation(
      addLocationInput: {
        location_name: $location_name
        description: $description
        capacity: $capacity
        address: $address
        city_name: $city_name
        state_id: $state_id
        country_id: $country_id
        zip_code: $zip_code
      }
    )
  }
`;

export const UPDATE_LOCATION = gql`
  mutation updateLocation(
    $id: Int!
    $location_name: String
    $description: String
    $capacity: Int
    $address: String
    $city_name: String
    $state_id: Int
    $country_id: Int
    $zip_code: String
  ) {
    updateLocation(
      updateLocationInput: {
        id: $id
        location_name: $location_name
        description: $description
        capacity: $capacity
        address: $address
        city_name: $city_name
        state_id: $state_id
        country_id: $country_id
        zip_code: $zip_code
      }
    )
  }
`;

export const DELETE_LOCATION = gql`
  mutation deleteLocation($ids: [Int]!) {
    deleteLocation(deleteLocationInput: { ids: $ids })
  }
`;

export const LOCATION_LOOKUP = gql`
  query getLocationLookup {
    getLocationLookup {
      id
      text
    }
  }
`;

export const LOCATION_LIST = gql`
  query getLocationList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getLocationList(
      getLocationListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      locations {
        id
        location_name
        description
        capacity
        address
        city_name
        state_id
        state_code
        state_name
        country_id
        country_name
        zip_code
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

export const GET_LOCATION = gql`
  query getLocation($id: Int!) {
    getLocation(getLocationInput: { id: $id }) {
      id
      location_name
      description
      capacity
      address
      city_name
      state_id
      state_code
      state_name
      country_id
      country_name
      zip_code
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
