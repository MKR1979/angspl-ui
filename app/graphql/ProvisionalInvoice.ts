import gql from 'graphql-tag';
export const ADD_PROVISIONAL_INVOICE = gql`
  mutation addProvisionalInvoice(
    $provisional_invoice_date: Date
    $order_id: Int
    $customer_id: Int
    $contact_id: Int
    $notes: String
    $customer_ref_no: String
    $incoterm_id: Int
    $term_id: Int
    $estimated_shipping_date: Date
    $expires_on: Date
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
    $items: [ProvisionalInvoiceItemInput]
  ) {
    addProvisionalInvoice(
      addProvisionalInvoiceInput: {
        provisional_invoice_date: $provisional_invoice_date
        order_id: $order_id
        customer_id: $customer_id
        contact_id: $contact_id
        notes: $notes
        customer_ref_no: $customer_ref_no
        incoterm_id: $incoterm_id
        term_id: $term_id
        estimated_shipping_date: $estimated_shipping_date
        expires_on: $expires_on
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

export const UPDATE_PROVISIONAL_INVOICE = gql`
  mutation updateProvisionalInvoice(
    $id: Int!
    $provisional_invoice_no: String
    $provisional_invoice_date: Date
    $order_id: Int
    $customer_id: Int
    $contact_id: Int
    $notes: String
    $customer_ref_no: String
    $incoterm_id: Int
    $term_id: Int
    $estimated_shipping_date: Date
    $expires_on: Date
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
    $items: [ProvisionalInvoiceItemInput]
  ) {
    updateProvisionalInvoice(
      updateProvisionalInvoiceInput: {
        id: $id
        provisional_invoice_no: $provisional_invoice_no
        provisional_invoice_date: $provisional_invoice_date
        order_id: $order_id
        customer_id: $customer_id
        contact_id: $contact_id
        notes: $notes
        customer_ref_no: $customer_ref_no
        incoterm_id: $incoterm_id
        term_id: $term_id
        estimated_shipping_date: $estimated_shipping_date
        expires_on: $expires_on
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

export const DELETE_PROVISIONAL_INVOICE = gql`
  mutation deleteProvisionalInvoice($ids: [Int]!) {
    deleteProvisionalInvoice(deleteProvisionalInvoiceInput: { ids: $ids })
  }
`;

export const PROVISIONAL_INVOICE_LOOKUP = gql`
  query getProvisionalInvoiceLookup {
    getProvisionalInvoiceLookup {
      id
      text
    }
  }
`;

export const PROVISIONAL_INVOICE_LIST = gql`
  query getProvisionalInvoiceList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getProvisionalInvoiceList(
      getProvisionalInvoiceListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      provisionalInvoices {
        id
        provisional_invoice_no
        provisional_invoice_date
        order_id
        order_no
        customer_id
        customer_name
        contact_id
        contact_name
        notes
        customer_ref_no
        incoterm_id
        incoterm_description
        term_id
        term_description
        estimated_shipping_date
        expires_on
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

export const GET_PROVISIONAL_INVOICE = gql`
  query getProvisionalInvoice($id: Int!) {
    getProvisionalInvoice(getProvisionalInvoiceInput: { id: $id }) {
      id
      provisional_invoice_no
      provisional_invoice_date
      order_id
      order_no
      customer_id
      customer_name
      contact_id
      contact_name
      notes
      customer_ref_no
      incoterm_id
      incoterm_description
      term_id
      term_description
      estimated_shipping_date
      expires_on
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

export const GET_PROVISIONAL_INVOICE_ITEM_LIST = gql`
  query getProvisionalInvoiceItemList($provisional_invoice_id: Int!) {
    getProvisionalInvoiceItemList(provisional_invoice_id: $provisional_invoice_id) {
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
