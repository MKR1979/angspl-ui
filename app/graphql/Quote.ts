import gql from 'graphql-tag';
export const ADD_QUOTE = gql`
  mutation addQuote(
    $quote_date: Date
    $customer_id: Int
    $sales_person_id: Int
    $contact_id: Int
    $expires_on: Date
    $notes: String
    $customer_ref_no: String
    $incoterm_id: Int
    $term_id: Int
    $sub_total_amount: Float
    $shipping_charges: Float
    $shipping_tax_id: Int
    $shipping_tax_amount: Float
    $total_amount: Float
    $discount_amount: Float
    $tax_amount: Float
    $grand_total_amount: Float
    $currency_id: Int
    $status: String
    $approval_status: String
    $approval_issues: String
    $billing_address: String
    $billing_city_name: String
    $billing_state_id: Int
    $billing_country_id: Int
    $billing_zip_code: String
    $shipping_address: String
    $shipping_city_name: String
    $shipping_state_id: Int
    $shipping_country_id: Int
    $shipping_zip_code: String
    $items: [QuoteItemInput]
  ) {
    addQuote(
      addQuoteInput: {
        quote_date: $quote_date
        customer_id: $customer_id
        sales_person_id: $sales_person_id
        contact_id: $contact_id
        expires_on: $expires_on
        notes: $notes
        customer_ref_no: $customer_ref_no
        incoterm_id: $incoterm_id
        term_id: $term_id
        sub_total_amount: $sub_total_amount
        shipping_charges: $shipping_charges
        shipping_tax_id: $shipping_tax_id
        shipping_tax_amount: $shipping_tax_amount
        total_amount: $total_amount
        discount_amount: $discount_amount
        tax_amount: $tax_amount
        grand_total_amount: $grand_total_amount
        currency_id: $currency_id
        status: $status
        approval_status: $approval_status
        approval_issues: $approval_issues
        billing_address: $billing_address
        billing_city_name: $billing_city_name
        billing_state_id: $billing_state_id
        billing_country_id: $billing_country_id
        billing_zip_code: $billing_zip_code
        shipping_address: $shipping_address
        shipping_city_name: $shipping_city_name
        shipping_state_id: $shipping_state_id
        shipping_country_id: $shipping_country_id
        shipping_zip_code: $shipping_zip_code
        items: $items
      }
    )
  }
`;

export const UPDATE_QUOTE = gql`
  mutation updateQuote(
    $id: Int!
    $quote_no: String
    $quote_date: Date
    $customer_id: Int
    $sales_person_id: Int
    $contact_id: Int
    $expires_on: Date
    $notes: String
    $customer_ref_no: String
    $incoterm_id: Int
    $term_id: Int
    $sub_total_amount: Float
    $shipping_charges: Float
    $shipping_tax_id: Int
    $shipping_tax_amount: Float
    $total_amount: Float
    $discount_amount: Float
    $tax_amount: Float
    $grand_total_amount: Float
    $currency_id: Int
    $status: String
    $approval_status: String
    $approval_issues: String
    $billing_address: String
    $billing_city_name: String
    $billing_state_id: Int
    $billing_country_id: Int
    $billing_zip_code: String
    $shipping_address: String
    $shipping_city_name: String
    $shipping_state_id: Int
    $shipping_country_id: Int
    $shipping_zip_code: String
    $items: [QuoteItemInput]
  ) {
    updateQuote(
      updateQuoteInput: {
        id: $id
        quote_no: $quote_no
        quote_date: $quote_date
        customer_id: $customer_id
        sales_person_id: $sales_person_id
        contact_id: $contact_id
        expires_on: $expires_on
        notes: $notes
        customer_ref_no: $customer_ref_no
        incoterm_id: $incoterm_id
        term_id: $term_id
        sub_total_amount: $sub_total_amount
        shipping_charges: $shipping_charges
        shipping_tax_id: $shipping_tax_id
        shipping_tax_amount: $shipping_tax_amount
        total_amount: $total_amount
        discount_amount: $discount_amount
        tax_amount: $tax_amount
        grand_total_amount: $grand_total_amount
        currency_id: $currency_id
        status: $status
        approval_status: $approval_status
        approval_issues: $approval_issues
        billing_address: $billing_address
        billing_city_name: $billing_city_name
        billing_state_id: $billing_state_id
        billing_country_id: $billing_country_id
        billing_zip_code: $billing_zip_code
        shipping_address: $shipping_address
        shipping_city_name: $shipping_city_name
        shipping_state_id: $shipping_state_id
        shipping_country_id: $shipping_country_id
        shipping_zip_code: $shipping_zip_code
        items: $items
      }
    )
  }
`;

export const DELETE_QUOTE = gql`
  mutation deleteQuote($ids: [Int]!) {
    deleteQuote(deleteQuoteInput: { ids: $ids })
  }
`;

export const QUOTE_LOOKUP = gql`
  query getQuoteLookup($full: Boolean!) {
    getQuoteLookup(full: $full) {
      id
      text
    }
  }
`;

export const QUOTE_LIST = gql`
  query getQuoteList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getQuoteList(
      getQuoteListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      quotes {
        id
        quote_no
        quote_date
        customer_id
        customer_name
        sales_person_id
        sales_person_name
        contact_id
        contact_name
        expires_on
        notes
        customer_ref_no
        incoterm_id
        incoterm_description
        term_id
        term_description
        sub_total_amount
        shipping_charges
        shipping_tax_id
        shipping_tax_description
        shipping_tax_amount
        total_amount
        discount_amount
        tax_amount
        grand_total_amount
        currency_id
        currency_name
        currency_symbol
        status
        approval_status
        approval_issues
        billing_address
        billing_city_name
        billing_state_id
        billing_state_code
        billing_state_name
        billing_country_id
        billing_country_name
        billing_zip_code
        shipping_address
        shipping_city_name
        shipping_state_id
        shipping_state_code
        shipping_state_name
        shipping_country_id
        shipping_country_name
        shipping_zip_code
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

export const GET_QUOTE = gql`
  query getQuote($id: Int!) {
    getQuote(getQuoteInput: { id: $id }) {
      id
      quote_no
      quote_date
      customer_id
      customer_name
      sales_person_id
      sales_person_name
      contact_id
      contact_name
      expires_on
      notes
      customer_ref_no
      incoterm_id
      incoterm_description
      term_id
      term_description
      sub_total_amount
      shipping_charges
      shipping_tax_id
      shipping_tax_description
      shipping_tax_amount
      total_amount
      discount_amount
      tax_amount
      grand_total_amount
      currency_id
      currency_name
      currency_symbol
      status
      approval_status
      approval_issues
      billing_address
      billing_city_name
      billing_state_id
      billing_state_code
      billing_state_name
      billing_country_id
      billing_country_name
      billing_zip_code
      shipping_address
      shipping_city_name
      shipping_state_id
      shipping_state_code
      shipping_state_name
      shipping_country_id
      shipping_country_name
      shipping_zip_code
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

export const GET_QUOTE_ITEM_LIST = gql`
  query getQuoteItemList($quote_id: Int!) {
    getQuoteItemList(quote_id: $quote_id) {
      id
      item_no
      product_id
      product_name
      part_number
      qty
      unit_id
      unit_name
      price
      discount_type
      discount
      discount_amount
      tax_id
      tax_description
      tax_amount
      amount
      lead_time
      deleted
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

export const GET_QUOTE_DATE_WISE_COUNT = gql`
  query getQuoteThisMonthDatewiseCount($from_date: Date!, $to_date: Date!) {
    getQuoteThisMonthDatewiseCount(from_date: $from_date, to_date: $to_date) {
      quote_date
      quote_date1
      total
    }
  }
`;

export const GET_QUOTE_OPEN_COUNT = gql`
  query getQuoteOpenCount {
    getQuoteOpenCount
  }
`;

export const GET_QUOTE_WON_COUNT = gql`
  query getQuoteWonCount {
    getQuoteWonCount
  }
`;

export const GET_QUOTE_LOST_COUNT = gql`
  query getQuoteLostCount {
    getQuoteLostCount
  }
`;
