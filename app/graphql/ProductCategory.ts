import gql from 'graphql-tag';
export const ADD_PRODUCT_CATEGORY = gql`
  mutation addProductCategory($product_category_name: String!) {
    addProductCategory(addProductCategoryInput: { product_category_name: $product_category_name })
  }
`;

export const UPDATE_PRODUCT_CATEGORY = gql`
  mutation updateProductCategory($id: Int!, $product_category_name: String!) {
    updateProductCategory(updateProductCategoryInput: { id: $id, product_category_name: $product_category_name })
  }
`;

export const DELETE_PRODUCT_CATEGORY = gql`
  mutation deleteProductCategory($ids: [Int]!) {
    deleteProductCategory(deleteProductCategoryInput: { ids: $ids })
  }
`;

export const PRODUCT_CATEGORY_LOOKUP = gql`
  query getProductCategoryLookup {
    getProductCategoryLookup {
      id
      text
    }
  }
`;

export const PRODUCT_CATEGORY_LIST = gql`
  query getProductCategoryList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getProductCategoryList(
      getProductCategoryListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      productCategories {
        id
        product_category_name
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

export const GET_PRODUCT_CATEGORY = gql`
  query getProductCategory($id: Int!) {
    getProductCategory(getProductCategoryInput: { id: $id }) {
      id
      product_category_name
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

export const GET_PRODUCT_CATEGORY_PRODUCT_CATEGORY_NAME_EXIST = gql`
  query getProductCategoryProductCategoryNameExist($id: Int!, $product_category_name: String!) {
    getProductCategoryProductCategoryNameExist(id: $id, product_category_name: $product_category_name)
  }
`;
