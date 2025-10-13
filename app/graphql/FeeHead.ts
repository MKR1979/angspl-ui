import gql from 'graphql-tag';
export const ADD_FEE_HEAD = gql`
  mutation addFeeHead(
    $fee_head_category_id: Int!
    $name: String!
    $code: String!
    $description: String
    $base_amount: Float
    $is_mandatory: Boolean
    $status: String
   ) {
    addFeeHead(
      addFeeHeadInput: {
        fee_head_category_id: $fee_head_category_id
        name: $name
        code: $code
        description: $description
        base_amount: $base_amount
        is_mandatory: $is_mandatory
        status: $status
       }
    )
  }
`;

export const UPDATE_FEE_HEAD = gql`
  mutation updateFeeHead(
    $id: Int!
    $fee_head_category_id: Int!
    $name: String!
    $code: String!
    $description: String
    $base_amount: Float
    $is_mandatory: Boolean
    $status: String
    ) {
    updateFeeHead(
      updateFeeHeadInput: {
        id: $id
        fee_head_category_id: $fee_head_category_id
        name: $name
        code: $code
        description: $description
        base_amount: $base_amount
        is_mandatory: $is_mandatory
        status: $status
        }
    )
  }
`;

export const GET_FEE_HEAD_LIST = gql`
  query getFeeHeadList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    ) {
    getFeeHeadList(
      getFeeHeadListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
        }
    ) {
      total_records
      feeHeads {
        id
        fee_head_category_id
        category_name
        name
        code
        description
        base_amount       
        is_mandatory
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

export const GET_FEE_HEAD = gql`
  query getFeeHead($id: Int!) {
   getFeeHead(getFeeHeadInput: { id: $id }) {
      id
      fee_head_category_id
      category_name
      name
      code
      description
      base_amount
      is_mandatory
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

export const DELETE_FEE_HEAD = gql`
  mutation deleteFeeHead($ids: [Int]!) {
    deleteFeeHead(deleteFeeHeadInput: { ids: $ids })
  }
`;

export const FEE_HEAD_LOOKUP = gql`
  query getFeeHeadLookup {
    getFeeHeadLookup {
      id
      text
    }
  }
`;