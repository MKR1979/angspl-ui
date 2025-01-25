import gql from 'graphql-tag';
export const ADD_OPPORTUNITY_TYPE = gql`
  mutation addOpportunityType($opportunity_type_name: String!) {
    addOpportunityType(addOpportunityTypeInput: { opportunity_type_name: $opportunity_type_name })
  }
`;

export const UPDATE_OPPORTUNITY_TYPE = gql`
  mutation updateOpportunityType($id: Int!, $opportunity_type_name: String!) {
    updateOpportunityType(updateOpportunityTypeInput: { id: $id, opportunity_type_name: $opportunity_type_name })
  }
`;

export const DELETE_OPPORTUNITY_TYPE = gql`
  mutation deleteOpportunityType($ids: [Int]!) {
    deleteOpportunityType(deleteOpportunityTypeInput: { ids: $ids })
  }
`;

export const OPPORTUNITY_TYPE_LOOKUP = gql`
  query getOpportunityTypeLookup {
    getOpportunityTypeLookup {
      id
      text
    }
  }
`;

export const OPPORTUNITY_TYPE_LIST = gql`
  query getOpportunityTypeList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getOpportunityTypeList(
      getOpportunityTypeListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      opportunityTypes {
        id
        opportunity_type_name
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

export const GET_OPPORTUNITY_TYPE = gql`
  query getOpportunityType($id: Int!) {
    getOpportunityType(getOpportunityTypeInput: { id: $id }) {
      id
      opportunity_type_name
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

export const GET_OPPORTUNITY_TYPE_OPPORTUNITY_TYPE_NAME_EXIST = gql`
  query getOpportunityTypeOpportunityTypeNameExist($id: Int!, $opportunity_type_name: String!) {
    getOpportunityTypeOpportunityTypeNameExist(id: $id, opportunity_type_name: $opportunity_type_name)
  }
`;
