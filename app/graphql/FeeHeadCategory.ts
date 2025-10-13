import gql from 'graphql-tag';
export const ADD_FEE_HEAD = gql`
  mutation addFeeHeadCategory(
    $name: String!
    $category: String!
    $status: String
   ) {
    addFeeHeadCategory(
      addFeeHeadCategoryInput: {
        name: $name
        category: $code
        status: $status
       }
    )
  }
`;

export const UPDATE_FEE_HEAD_CATEGORY = gql`
  mutation updateFeeHeadCategory(
    $id: Int!
    $name: String!
    $category: String!
    $status: String
    ) {
    updateFeeHeadCategory(
      updateFeeHeadCategoryInput: {
        id: $id
        name: $name
        category: $code
        status: $status
        }
    )
  }
`;

export const GET_FEE_HEAD_CATEGORY_LIST = gql`
  query getFeeHeadCategoryList(
    $filter_text: String
    $sort_direction: String
    $sort_field: String
    $offset: Int
    $limit: Int
    ) {
    getFeeHeadCategoryList(
      getFeeHeadCategoryListInput: {
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
        name
        category
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

export const GET_FEE_HEAD_CATEGORY = gql`
  query getFeeHeadCategory($id: Int!) {
   getFeeHeadCategory(getFeeHeadCategoryInput: { id: $id }) {
      id
      name
      category
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

export const DELETE_FEE_HEAD_CATEGORY = gql`
  mutation deleteFeeHeadCategoryCategory($ids: [Int]!) {
    deleteFeeHeadCategoryCategory(deleteFeeHeadCategoryCategoryInput: { ids: $ids })
  }
`;

export const FEE_HEAD_CATEGORY_LOOKUP = gql`
  query getFeeHeadCategoryLookup {
    getFeeHeadCategoryLookup {
      id
      text
    }
  }
`;