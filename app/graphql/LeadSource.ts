import gql from 'graphql-tag';
export const ADD_LEAD_SOURCE = gql`
  mutation addLeadSource($lead_source_name: String!) {
    addLeadSource(addLeadSourceInput: { lead_source_name: $lead_source_name })
  }
`;

export const UPDATE_LEAD_SOURCE = gql`
  mutation updateLeadSource($id: Int!, $lead_source_name: String!) {
    updateLeadSource(updateLeadSourceInput: { id: $id, lead_source_name: $lead_source_name })
  }
`;

export const DELETE_LEAD_SOURCE = gql`
  mutation deleteLeadSource($ids: [Int]!) {
    deleteLeadSource(deleteLeadSourceInput: { ids: $ids })
  }
`;

export const LEAD_SOURCE_LOOKUP = gql`
  query getLeadSourceLookup {
    getLeadSourceLookup {
      id
      text
    }
  }
`;

export const LEAD_SOURCE_LIST = gql`
  query getLeadSourceList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getLeadSourceList(
      getLeadSourceListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      leadSources {
        id
        lead_source_name
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

export const GET_LEAD_SOURCE = gql`
  query getLeadSource($id: Int!) {
    getLeadSource(getLeadSourceInput: { id: $id }) {
      id
      lead_source_name
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

export const GET_LEAD_SOURCE_LEAD_SOURCE_NAME_EXIST = gql`
  query getLeadSourceLeadSourceNameExist($id: Int!, $lead_source_name: String!) {
    getLeadSourceLeadSourceNameExist(id: $id, lead_source_name: $lead_source_name)
  }
`;
