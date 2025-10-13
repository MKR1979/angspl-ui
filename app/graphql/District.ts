import gql from 'graphql-tag';
export const ADD_DISTRICT = gql`
  mutation addDistrict($district_name: String!, $district_code: String, $country_id: Int, $state_id: Int, $status: String) {
    addDistrict(addDistrictInput: { district_name: $district_name, district_code: $district_code,country_id: $country_id, state_id: $state_id, status: $status })
  }
`;

export const UPDATE_DISTRICT = gql`
  mutation updateDistrict($id: Int!, $district_name: String!, $district_code: String, $country_id: Int, $state_id: Int, $status: String) {
    updateDistrict(updateDistrictInput: { id: $id, district_name: $district_name, district_code: $district_code, country_id: $country_id, state_id: $state_id, status: $status })
  }
`;

export const DELETE_DISTRICT = gql`
  mutation deleteDistrict($ids: [Int]!) {
    deleteDistrict(deleteDistrictInput: { ids: $ids })
  }
`;

// export const STATE_LOOKUP = gql`
//   query getStateLookup($country_id: Int!) {
//     getStateLookup(country_id: $country_id) {
//       id
//       text
//     }
//   }
// `;


export const DISTRICT_LOOKUP = gql`
  query getDistrictLookup($state_id: Int!) {
    getDistrictLookup(state_id: $state_id) {
      id
      text
    }
  }
`;

export const DISTRICT_LIST = gql`
  query getDistrictList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getDistrictList(
      getDistrictListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      districts {
        id
        country_id
        country_name
        district_name
        district_code
        state_id
        state_name
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

// export const DISTRICT_SHORTLIST = gql`
//   query getDistrictList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
//     getDistrictList(
//       getDistrictListInput: {
//         filter_text: $filter_text
//         sort_direction: $sort_direction
//         sort_field: $sort_field
//         offset: $offset
//         limit: $limit
//       }
//     ) {
//       total_records
//       states {
//         id
//         district_name
//         district_code
//       }
//     }
//   }
// `;

export const GET_DISTRICT = gql`
  query getDistrict($id: Int!) {
    getDistrict(getDistrictInput: { id: $id }) {
      id
      country_id
      country_name
      district_name
      district_code
      state_id
      state_name
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
