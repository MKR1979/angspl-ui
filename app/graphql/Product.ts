import gql from 'graphql-tag';
export const ADD_PRODUCT = gql`
  mutation addProduct(
    $product_name: String!
    $part_number: String
    $unit_id: Int
    $product_category_id: Int
    $product_type: String
    $currency_id: Int
    $cost: Float
    $contact: String
    $url: String
    $description: String
    $product_image: String
    $items: [ProductPriceInput]
  ) {
    addProduct(
      addProductInput: {
        product_name: $product_name
        part_number: $part_number
        unit_id: $unit_id
        product_category_id: $product_category_id
        product_type: $product_type
        currency_id: $currency_id
        cost: $cost
        contact: $contact
        url: $url
        description: $description
        product_image: $product_image
        items: $items
      }
    )
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: Int!
    $product_name: String!
    $part_number: String
    $unit_id: Int
    $product_category_id: Int
    $product_type: String
    $currency_id: Int
    $cost: Float
    $contact: String
    $url: String
    $description: String
    $product_image: String
    $items: [ProductPriceInput]
  ) {
    updateProduct(
      updateProductInput: {
        id: $id
        product_name: $product_name
        part_number: $part_number
        unit_id: $unit_id
        product_category_id: $product_category_id
        product_type: $product_type
        currency_id: $currency_id
        cost: $cost
        contact: $contact
        url: $url
        description: $description
        product_image: $product_image
        items: $items
      }
    )
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($ids: [Int]!) {
    deleteProduct(deleteProductInput: { ids: $ids })
  }
`;

export const PRODUCT_LIST = gql`
  query getProductList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getProductList(
      getProductListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      products {
        id
        product_name
        part_number
        unit_id
        unit_code
        unit_name
        product_category_id
        product_category_name
        product_type
        currency_id
        currency_name
        currency_symbol
        cost
        contact
        url
        description
        product_image
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

export const GET_PRODUCT = gql`
  query getProduct($id: Int!) {
    getProduct(getProductInput: { id: $id }) {
      id
      product_name
      part_number
      unit_id
      unit_code
      unit_name
      product_category_id
      product_category_name
      product_type
      currency_id
      currency_name
      currency_symbol
      cost
      contact
      url
      description
      product_image
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

export const PRODUCT_LOOKUP = gql`
  query getProductLookup {
    getProductLookup {
      id
      text
    }
  }
`;

export const GET_PRODUCT_PRODUCT_NAME_EXIST = gql`
  query getProductProductNameExist($id: Int!, $product_name: String!) {
    getProductProductNameExist(id: $id, product_name: $product_name)
  }
`;

export const GET_PRODUCT_PART_NUMBER_EXIST = gql`
  query getProductPartNumberExist($id: Int!, $part_number: String!) {
    getProductPartNumberExist(id: $id, part_number: $part_number)
  }
`;

export const UPLOAD_PRODUCT_IMAGE = gql`
  mutation singleUpload($files: [Upload]!) {
    singleUpload(files: $files) {
      filename
      mimetype
      encoding
    }
  }
`;

export const GET_PRODUCT_PRICE_ALL = gql`
  query getProductPriceAll($product_id: Int!) {
    getProductPriceAll(product_id: $product_id) {
      id
      currency_id
      currency_name
      currency_symbol
      unit_price
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

export const GET_PRODUCT_PRICE = gql`
  query getProductPrice($product_id: Int!, $currency_id: Int!) {
    getProductPrice(product_id: $product_id, currency_id: $currency_id) {
      id
      currency_id
      currency_name
      currency_symbol
      unit_price
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
