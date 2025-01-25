import gql from 'graphql-tag';
export const ADD_DELIVERY_SLIP = gql`
  mutation addDeliverySlip(
    $delivery_slip_no: String
    $delivery_slip_date: Date
    $customer_id: Int
    $contact_id: Int
    $due_date: Date
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
    $items: [DeliverySlipItemInput]
  ) {
    addDeliverySlip(
      addDeliverySlipInput: {
        delivery_slip_no: $delivery_slip_no
        delivery_slip_date: $delivery_slip_date
        customer_id: $customer_id
        contact_id: $contact_id
        due_date: $due_date
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

export const UPDATE_DELIVERY_SLIP = gql`
  mutation updateDeliverySlip(
    $id: Int!
    $delivery_slip_no: String
    $delivery_slip_date: Date
    $customer_id: Int
    $contact_id: Int
    $due_date: Date
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
    $items: [DeliverySlipItemInput]
  ) {
    updateDeliverySlip(
      updateDeliverySlipInput: {
        id: $id
        delivery_slip_no: $delivery_slip_no
        delivery_slip_date: $delivery_slip_date
        customer_id: $customer_id
        contact_id: $contact_id
        due_date: $due_date
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

export const DELETE_DELIVERY_SLIP = gql`
  mutation deleteDeliverySlip($ids: [Int]!) {
    deleteDeliverySlip(deleteDeliverySlipInput: { ids: $ids })
  }
`;

export const DELIVERY_SLIP_LOOKUP = gql`
  query getDeliverySlipLookup {
    getDeliverySlipLookup {
      id
      text
    }
  }
`;

export const DELIVERY_SLIP_LIST = gql`
  query getDeliverySlipList($filter_text: String, $sort_direction: String, $sort_field: String, $offset: Int, $limit: Int) {
    getDeliverySlipList(
      getDeliverySlipListInput: {
        filter_text: $filter_text
        sort_direction: $sort_direction
        sort_field: $sort_field
        offset: $offset
        limit: $limit
      }
    ) {
      total_records
      deliverySlips {
        id
        delivery_slip_no
        delivery_slip_date
        customer_id
        customer_name
        contact_id
        contact_name
        due_date
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

export const GET_DELIVERY_SLIP = gql`
  query getDeliverySlip($id: Int!) {
    getDeliverySlip(getDeliverySlipInput: { id: $id }) {
      id
      delivery_slip_no
      delivery_slip_date
      customer_id
      customer_name
      contact_id
      contact_name
      due_date
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

export const GET_DELIVERY_SLIP_ITEM_LIST = gql`
  query getDeliverySlipItemList($delivery_slip_id: Int!) {
    getDeliverySlipItemList(delivery_slip_id: $delivery_slip_id) {
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
