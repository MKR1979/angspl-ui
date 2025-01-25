import gql from 'graphql-tag';
export const ADD_CURRENCY = gql`
  mutation addCurrency($currency_code: String, $currency_name: String, $currency_symbol: String) {
    addCurrency(addCurrencyInput: { currency_code: $currency_code, currency_name: $currency_name, currency_symbol: $currency_symbol })
  }
`;

export const UPDATE_CURRENCY = gql`
  mutation updateCurrency($id: Int!, $currency_code: String, $currency_name: String, $currency_symbol: String) {
    updateCurrency(
      updateCurrencyInput: { id: $id, currency_code: $currency_code, currency_name: $currency_name, currency_symbol: $currency_symbol }
    )
  }
`;

export const DELETE_CURRENCY = gql`
  mutation deleteCurrency($ids: [Int]!) {
    deleteCurrency(deleteCurrencyInput: { ids: $ids })
  }
`;

export const CURRENCY_LOOKUP = gql`
  query getCurrencyLookup {
    getCurrencyLookup {
      id
      text
    }
  }
`;

export const CURRENCY_LIST = gql`
  query getCurrencyList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getCurrencyList(
      getCurrencyListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      currencies {
        id
        currency_code
        currency_name
        currency_symbol
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

export const GET_CURRENCY = gql`
  query getCurrency($id: Int!) {
    getCurrency(getCurrencyInput: { id: $id }) {
      id
      currency_code
      currency_name
      currency_symbol
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

export const GET_CURRENCY_CURRENCY_CODE_EXIST = gql`
  query getCurrencyCurrencyCodeExist($id: Int!, $currency_code: String!) {
    getCurrencyCurrencyCodeExist(id: $id, currency_code: $currency_code)
  }
`;

export const GET_CURRENCY_CURRENCY_NAME_EXIST = gql`
  query getCurrencyCurrencyNameExist($id: Int!, $currency_name: String!) {
    getCurrencyCurrencyNameExist(id: $id, currency_name: $currency_name)
  }
`;
