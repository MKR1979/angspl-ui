import gql from 'graphql-tag';
export const ADD_OPPORTUNITY = gql`
  mutation addOpportunity(
    $opportunity_name: String
    $account_id: Int
    $currency_id: Int
    $amount: Int
    $expected_close_date: Date
    $stage_id: Int
    $opportunity_type_id: Int
    $probability: Float
    $lead_source_id: Int
    $next_step: String
    $description: String
    $assigned_to: Int
  ) {
    addOpportunity(
      addOpportunityInput: {
        opportunity_name: $opportunity_name
        account_id: $account_id
        currency_id: $currency_id
        amount: $amount
        expected_close_date: $expected_close_date
        stage_id: $stage_id
        opportunity_type_id: $opportunity_type_id
        probability: $probability
        lead_source_id: $lead_source_id
        next_step: $next_step
        description: $description
        assigned_to: $assigned_to
      }
    )
  }
`;

export const UPDATE_OPPORTUNITY = gql`
  mutation updateOpportunity(
    $id: Int!
    $opportunity_name: String
    $account_id: Int
    $currency_id: Int
    $amount: Int
    $expected_close_date: Date
    $stage_id: Int
    $opportunity_type_id: Int
    $probability: Float
    $lead_source_id: Int
    $next_step: String
    $description: String
    $assigned_to: Int
  ) {
    updateOpportunity(
      updateOpportunityInput: {
        id: $id
        opportunity_name: $opportunity_name
        account_id: $account_id
        currency_id: $currency_id
        amount: $amount
        expected_close_date: $expected_close_date
        stage_id: $stage_id
        opportunity_type_id: $opportunity_type_id
        probability: $probability
        lead_source_id: $lead_source_id
        next_step: $next_step
        description: $description
        assigned_to: $assigned_to
      }
    )
  }
`;

export const DELETE_OPPORTUNITY = gql`
  mutation deleteOpportunity($ids: [Int]!) {
    deleteOpportunity(deleteOpportunityInput: { ids: $ids })
  }
`;

export const OPPORTUNITY_LOOKUP = gql`
  query getOpportunityLookup {
    getOpportunityLookup {
      id
      text
    }
  }
`;

export const OPPORTUNITY_LIST = gql`
  query getOpportunityList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getOpportunityList(
      getOpportunityListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      opportunities {
        id
        opportunity_name
        account_id
        account_name
        currency_id
        currency_name
        amount
        expected_close_date
        stage_id
        stage_name
        opportunity_type_id
        opportunity_type_name
        probability
        lead_source_id
        lead_source_name
        next_step
        description
        assigned_to
        assigned_to_user_name
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

export const GET_OPPORTUNITY = gql`
  query getOpportunity($id: Int!) {
    getOpportunity(getOpportunityInput: { id: $id }) {
      id
      opportunity_name
      account_id
      account_name
      currency_id
      currency_name
      amount
      expected_close_date
      stage_id
      stage_name
      opportunity_type_id
      opportunity_type_name
      probability
      lead_source_id
      lead_source_name
      next_step
      description
      assigned_to
      assigned_to_user_name
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
