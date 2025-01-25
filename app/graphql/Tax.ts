import gql from 'graphql-tag';
export const ADD_TAX = gql`
  mutation addTax($tax_description: String, $tax_percentage: Float) {
    addTax(addTaxInput: { tax_description: $tax_description, tax_percentage: $tax_percentage })
  }
`;

export const UPDATE_TAX = gql`
  mutation updateTax($id: Int!, $tax_description: String, $tax_percentage: Float) {
    updateTax(updateTaxInput: { id: $id, tax_description: $tax_description, tax_percentage: $tax_percentage })
  }
`;

export const DELETE_TAX = gql`
  mutation deleteTax($ids: [Int]!) {
    deleteTax(deleteTaxInput: { ids: $ids })
  }
`;

export const TAX_LOOKUP = gql`
  query getTaxLookup {
    getTaxLookup {
      id
      text
    }
  }
`;

export const TAX_LIST = gql`
  query getTaxList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getTaxList(
      getTaxListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      taxes {
        id
        tax_description
        tax_percentage
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

export const GET_TAX = gql`
  query getTax($id: Int!) {
    getTax(getTaxInput: { id: $id }) {
      id
      tax_description
      tax_percentage
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

export const GET_TAX_TAX_DESCRIPTION_EXIST = gql`
  query getTaxTaxDescriptionExist($id: Int!, $tax_description: String!) {
    getTaxTaxDescriptionExist(id: $id, tax_description: $tax_description)
  }
`;
